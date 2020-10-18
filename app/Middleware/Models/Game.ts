import { DateTime } from 'luxon'
import { Identity, EventTime, Paginate } from '../Interface/Shared'

// it shouldn't be exported
// TODO: after finished paging output need to close it.
export class GameResponse implements Identity, EventTime {
  public id: number
  public appid: number
  public name: string
  public createdAt: DateTime
  public updatedAt: DateTime
}

export class GameResult {
  public Page: Paginate
  public Data: Array<GameResponse>
}
