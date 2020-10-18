import { DateTime } from 'luxon'
import { Identity, EventTime, Paginate } from '../Interface/Shared'

// it shouldn't be exported
// TODO: after finished paging output need to close it.
export interface GameResponse extends Identity, EventTime {
  name: string
}

export class GameResult {
  public Page: Paginate
  public Data: Array<GameResponse>
}
