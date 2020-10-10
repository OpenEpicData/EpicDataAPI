/**
 * WIP
 */



import { BaseCommand, logger } from '@adonisjs/ace'
import { URL } from 'url'
import cheerio from 'cheerio'
import sleep from 'sleep'
import News from 'App/Models/News'
import got from 'got/dist/source'
import Tag from 'App/Models/Tag'
import NewsTag from 'App/Models/NewsTag'

const vgtimeURL = 'https://www.vgtime.com/topic/index/load.jhtml?page=1&pageSize=12'

export default class SpiderNews extends BaseCommand {
  public static commandName = 'spider:news'
  public static description = '抓取游戏新闻'

  public static settings = {
    loadApp: true,
  }

  public async handle() {
    await this.fetch()
  }

  private async fetch() {
    const $vgtime = await this.fetchNews(vgtimeURL)
    await this.vgtime($vgtime)
  }

  private async vgtime($dom: any) {
    const self = this
    $dom('.news').each(async function () {
      const
        data = {
          title: $dom(this).find('h2').text(),
          description: $dom(this).find('p').text(),
          author: $dom(this).find('.user_name').text(),
          hyperlink: `https://www.vgtime.com${$dom(this).find('a').attr('href')}`,
        }

      const
        news = await News.updateOrCreate(data, { title: data.title })

      const newsID = news.id
      const pullWordData = await self.pullWord(`${data.title},${data.description}`)

      logger.info(`news: ${data.title},${data.description}`)

      await self.insertTags(pullWordData, newsID)

      await sleep.sleep(1)
    })
  }

  private async fetchNews(url: string | URL) {
    const
      response = await got(url)
    const body = JSON.parse(response.body).data

    return cheerio.load(body)
  }

  private async pullWord(text: string) {
    const
      url = `http://api.pullword.com/get.php?source=${text}&param1=0&param2=1&json=1`
    const response = await got(url)
    const body = JSON.parse(response.body)

    return body
  }

  private async insertTags(data: any[], newsID: number) {
    data.forEach(async element => {
      const
        title = element.t

      const tag = await Tag.updateOrCreate({
        title: title,
      }, { title: title })

      const tagID = tag.id

      await this.insertNewsTags(element, newsID, tagID)
    })
  }

  private async insertNewsTags(element: { t: string; p: string; }, newsID: number, tagID: number) {
    const
      title = element.t
    const similarity = element.p
    const data = {
      news_id: newsID,
      tag_id: tagID,
      title: title,
      similarity: similarity,
    }

    await NewsTag.updateOrCreate(data, data)

    logger.info(`insert newsID: ${newsID}, tagID: ${tagID}, pull_title: ${title}, similarity: ${similarity}`)
  }
}
