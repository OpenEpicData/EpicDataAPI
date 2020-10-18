import { DateTime } from 'luxon'
import { EventTime } from '../Interface/Shared'

export class Game implements Identity, EventTime {
  public id: number
  public appid: number
  public name: string
  public createdAt: DateTime
  public updateAt: DateTime
}
