'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comentario extends Model {
  static get objectIDs () {
    return ["pedido_id", "alojamiento_id"];
  }
}

module.exports = Comentario
