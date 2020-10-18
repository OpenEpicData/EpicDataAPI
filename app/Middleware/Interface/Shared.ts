import { DateTime } from 'luxon'

export interface Identity {
  id: number
  appid: number
}

export interface EventTime {
  createdAt: DateTime
  updatedAt: DateTime
}
