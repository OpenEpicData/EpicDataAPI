import Game from 'App/Models/Game'
import { GameResponse } from 'App/Middleware/Models/Game'

export default class GamesController {
  public async index ({ request }) {
    const requestGet = request.get()
    const result: GameResponse[] = []
    await Game.query()
      .orderBy('created_at', 'desc')
      .paginate(requestGet.page, requestGet.limit)
      .then(item => {
        item.forEach(f => {
          result.push({
            id: f.id,
            appid: f.appid,
            name: f.name,
            createdAt: f.createdAt,
            updatedAt: f.updatedAt,
          })
        })
      })
    return result
  }

  public async show ({ params }) {
    const requestId = params.id
    const result = new GameResponse()
    return await Game.find(requestId)
      .then((data: (GameResponse | null)) => {
        if (data !== null) {
          result.id = data.id,
          result.appid = data.appid,
          result.name = data.name,
          result.createdAt = data.createdAt,
          result.updatedAt = data.updatedAt
        }
      })
  }
}
