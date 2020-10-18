import {QueryResponse} from 'App/Middleware/Models/Game'
import Game from 'App/Models/Game'

export default class GamesController {
  public async index ({ request }) {
    const requestGet = request.get()
    const result: QueryResponse[] = []
    const query = await Game.query()
      .orderBy('created_at', 'desc')
      .paginate(requestGet.page, requestGet.limit)
      .then(item => {
        item.forEach(f => {
          result.push({
            id: f.id,
            appid: f.appid,
            name: f.name,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt
          })
        })
      })
    return result
  }
}
