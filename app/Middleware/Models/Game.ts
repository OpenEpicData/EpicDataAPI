import { DateTime } from 'luxon'
import { Identity, EventTime } from '../Interface/Shared'

export class QueryResponse implements Identity, EventTime {
  public id: number
  public appid: number
  public name: string
  public createdAt: DateTime
  public updatedAt: DateTime
}
