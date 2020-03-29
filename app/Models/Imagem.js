'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imagem extends Model {
  static get table () {
    return 'imagens'
  }

  static get primaryKey () {
    return 'idImagem'
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }
}

module.exports = Imagem
