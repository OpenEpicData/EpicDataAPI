import got from "got";
import cheerio from "cheerio";
import sleep from "sleep";
import News from "App/Models/News";
import NewsTag from "App/Models/NewsTag";
import { URL } from "url";
import Tag from "App/Models/Tag";
import { logger } from "@adonisjs/ace";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const vgtime_url = 'https://www.vgtime.com/topic/index/load.jhtml?page=1&pageSize=12'

export default class NewsController {
  public async index(ctx: HttpContextContract) {
    const
      request = ctx.request.get(),
      news_tags = await NewsTag.query().orderBy('id', 'desc'),
      news = await News.query()
        .preload('newsTags', (query) => {
          query.orderBy('similarity', 'desc')
        })
        .orderBy('id', 'desc')
        .paginate(request.page, request.limit)

    return {
      news: news,
      news_tags: news_tags
    }
  }

  public async create() {
    await this.fetch()
  }

  private async fetch() {
    const $vgtime = await this.fetchNews(vgtime_url)
    await this.vgtime($vgtime)
  }

  private async vgtime($: any) {
    const self = this
    $('.news').each(async function () {
      const
        data = {
          title: $(this).find('h2').text(),
          description: $(this).find('p').text(),
          author: $(this).find('.user_name').text(),
          hyperlink: `https://www.vgtime.com${$(this).find('a').attr('href')}`
        }

      const news =
        await News.updateOrCreate(data, { title: data.title }),
        news_id = news.id,
        pullWordData = await self.pullWord(`${data.title},${data.description}`)

      logger.info(`news: ${data.title},${data.description}`)
      await self.insertTags(pullWordData, news_id)

      sleep.sleep(1)
    })
  }

  private async fetchNews(url: string | URL) {
    const
      response = await got(url),
      body = JSON.parse(response.body).data

    return cheerio.load(body)
  }

  private async pullWord(text: string) {
    const
      url = `http://api.pullword.com/get.php?source=${text}&param1=0.6&param2=1&json=1`,
      response = await got(url),
      body = JSON.parse(response.body)

    return body
  }

  private async insertTags(data: any[], news_id: number) {
    data.forEach(async element => {
      const
        title = element.t,
        tag = await Tag.updateOrCreate({
          title: title
        }, { title: title })

      const tag_id = tag.id

      await this.insertNewsTags(element, news_id, tag_id)
    });
  }

  private async insertNewsTags(element: { t: string; p: number; }, news_id: number, tag_id: number) {
    const
      title = element.t,
      similarity = element.p,
      data = {
        news_id: news_id,
        tag_id: tag_id,
        title: title,
        similarity: similarity
      }

    await NewsTag.updateOrCreate(data, data)

    logger.info(`insert news_id: ${news_id}, tag_id: ${tag_id}, pull_title: ${title}, similarity: ${similarity}`)
  }
}
