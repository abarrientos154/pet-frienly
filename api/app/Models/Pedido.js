'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
  productos () {
    return this.hasMany("App/Models/Comprado", "_id", "pedido_id")
  }
}

module.exports = Pedido
