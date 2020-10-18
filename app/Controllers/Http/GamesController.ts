import Game from 'App/Models/Game'
import { QueryResponse } from 'App/Middleware/Models/Game'

export default class GamesController {
  public async index ({ request }) {
    const requestGet = request.get()
    return await Game.query()
      .orderBy('created_at', 'desc')
      .paginate(requestGet.page, requestGet.limit)
      .then((data: Array<Game>) => {
        let result: Array<QueryResponse>
        data.forEach(item => {
          result.push(new QueryResponse(), {
            id: item.id,
            appid: item.appid,
            name: item.name,
            createdAt: item.createdAt,
            updateAt: item.updatedAt,
          })
        })
      })
  }
}
