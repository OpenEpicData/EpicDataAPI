import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class News extends BaseSchema {
  protected tableName = 'news'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.text('image_path').nullable()
      table.string('author').nullable()
      table.text('author_avatar_path').nullable()
      table.text('hyperlink').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
