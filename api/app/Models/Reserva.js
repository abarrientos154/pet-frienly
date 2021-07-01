'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reserva extends Model {
  static get objectIDpais () {
    return ["hospedador_id"];
  }
  representante () {
    return this.hasOne("App/Models/User", "hospedador_id", "_id")
  }
}

module.exports = Reserva
