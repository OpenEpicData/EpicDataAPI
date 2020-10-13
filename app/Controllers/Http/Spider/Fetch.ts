import got from 'got'
import cheerio from 'cheerio'
import News from 'App/Models/News'
import NewsTag from 'App/Models/NewsTag'
import Tag from 'App/Models/Tag'
import { logger } from '@adonisjs/ace'

class Fecth {
  _body: any
  _cheerioBody: cheerio.Root

  async get(url: string) {
    const response = await got(url)
    const body = JSON.parse(response.body).data

    this._body = body
    return this
  }

  dom() {
    this._cheerioBody = cheerio.load(this._body)
    return this
  }

  vgtime() {
    const self = this

    this._cheerioBody('.news').each(async function () {
      const
        data: any = {
          title: self._cheerioBody(this).find('h2').text(),
          description: self._cheerioBody(this).find('p').text(),
          author: self._cheerioBody(this).find('.user_name').text(),
          hyperlink: `https://www.vgtime.com${self._cheerioBody(this).find('a').attr('href')}`,
        }

      const news = await News.updateOrCreate(data, { hyperlink: data.hyperlink })
      const newsID = news.id

      const pullWordData = await self.pullWord(`${data.title},${data.description}`)

      logger.info(`news: ${data.title},${data.description}`)
      await insertTags(pullWordData, newsID)
    })


    async function insertTags(data: any[], newsID: number) {
      for (const iterator of data) {
        const
          title = iterator.t
        const tag = await Tag.updateOrCreate({
          title: title,
        }, { title: title })

        const tagID = tag.id

        await insertNewsTags(iterator, newsID, tagID)
      }
    }

    async function insertNewsTags(element: { t: string; p: string; }, newsID: number, tagID: number) {
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

  private async pullWord(text: string) {
    const
      url = `http://api.pullword.com/get.php?source=${text}&param1=0&param2=1&json=1`
    const response = await got(url)
    const body = JSON.parse(response.body)

    return body
  }
}

export default Fecth