import { BaseCommand } from '@adonisjs/ace'
import Database from '@ioc:Adonis/Lucid/Database';
import Game from 'App/Models/Game';
import got from "got";
import { chunk } from "lodash";
const ISteamAppsURL = `https://api.steampowered.com/ISteamApps/GetAppList/v0002/`

export default class SpiderGames extends BaseCommand {
  public static commandName = 'spider:games'
  public static description = '抓取游戏列表'

  public static settings = {
    loadApp: true,
  }

  public async handle() {
    this.logger.info(`start spider:games`)
    const response = await got(ISteamAppsURL)
    const body = JSON.parse(response.body)
    const apps = body.applist.apps

    /**
     * Postgres itself doesn't support more than 34464 parameters for a bound statement. 
     * You'll need to break up your bulk insert into multiple statements.
     * https://github.com/brianc/node-postgres/issues/1091
     */

    const chunkApps: any[] = chunk(apps, 1000)
    for (const iterator of chunkApps) {
      await Game.updateOrCreateMany('appid', iterator)
    }

    await Database.manager.closeAll()
    const time = new Date().getTime()

    this.logger.info(`${time}`)

  }
}
