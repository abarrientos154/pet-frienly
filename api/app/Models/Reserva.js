'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reserva extends Model {
  static get objectIDs () {
    return ["alojamiento_id", "_id", "hospedador_id", "cliente_id"];
  }
  representante () {
    return this.hasOne("App/Models/User", "cliente_id", "_id")
  }
  calificacion () {
    return this.hasOne("App/Models/Comentario", "_id", "alojamiento_id")
  }
}

module.exports = Reserva
