import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NewsTags extends BaseSchema {
  protected tableName = 'news_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('news_id')
      table.integer('tag_id')
      table.integer('similarity')
      table.string('title')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
