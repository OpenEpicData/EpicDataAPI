import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'

export default class NewsController {
  public async index(ctx: HttpContextContract) {
    const request = ctx.request.get()
    const reQuery = {
      tagTitle: request.tagTitle
    }

    const news = await News.query()
      .whereHas('newsTags', (query) => {
        query.apply((scopes) => scopes.tagTitle(reQuery))
      })
      .preload('newsTags')
      .orderBy('id', 'desc')
      .paginate(request.page, request.limit)

    return {
      news
    }
  }
}
