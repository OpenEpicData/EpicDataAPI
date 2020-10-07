import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News from 'App/Models/News'

export default class NewsController {
  public async index(ctx: HttpContextContract) {
    const request = ctx.request.get()
    const reQuery = {
      tagTitle: request.tagTitle ?? null
    }

    const news = await News.query()
      .whereHas('newsTags', (query) => {
        query.apply((scopes) => scopes.tagTitle(reQuery))
      })
      .preload('newsTags', (query) => {
        query.apply((scopes) => scopes.tagTitle(reQuery))
      })
      .orderBy('id', 'desc')
      .paginate(request.page, request.limit)

    return {
      news
    }
  }

  public async create() {
  }

  public async store() {
  }

  public async show() {
  }

  public async edit() {
  }

  public async update() {
  }

  public async destroy() {
  }
}
