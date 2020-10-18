import { DateTime } from 'luxon'

export interface Paginate {
  // strings
  firstPageUrl: string
  prevPageUrl: string
  nextPageUrl: string
  lastPageUrl: string

  // numbers
  currentPage: number
  pageSize: number
  firstPage: number
  lastPage: number
  totalItem: number
}

export interface Identity {
  id: number
  appid: number
}

export interface EventTime {
  createdAt: DateTime
  updatedAt: DateTime
}
