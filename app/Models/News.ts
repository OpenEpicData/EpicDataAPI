import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import NewsTag from './NewsTag'

export default class News extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public author: string

  @column()
  public hyperlink: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => NewsTag, {
    foreignKey: 'news_id',
  })
  public newsTags: HasMany<typeof NewsTag>
}
