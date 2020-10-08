import { DateTime } from 'luxon'
import { BaseModel, column, scope } from '@ioc:Adonis/Lucid/Orm'

interface INewsTagQuery {
  tagTitle: string[]
}

export default class NewsTag extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ isPrimary: true, serializeAs: null })
  public news_id: number

  @column({ isPrimary: true, serializeAs: null })
  public tag_id: number

  @column()
  public title: string

  @column()
  public similarity: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  public static tagTitle = scope((query, queryParams: INewsTagQuery) => {
    if (queryParams.tagTitle)
      query.whereIn('title', (<string><unknown>queryParams.tagTitle).split(','))

    query.orderBy('similarity', 'desc')
  })
}
