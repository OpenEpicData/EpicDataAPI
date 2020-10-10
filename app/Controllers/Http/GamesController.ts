import Game from 'App/Models/Game';

export default class GamesController {
  public async index({ request }) {
    const requestGet = request.get()
    return await Game.query()
      .orderBy('created_at', 'desc')
      .paginate(requestGet.page, requestGet.limit)
  }
}
