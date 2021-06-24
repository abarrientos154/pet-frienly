'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TiendaServicio extends Model {
  static fillable () {
    return ['destinatario', 'servicio_id', 'descripcion', 'price', '_id']
  }

  servicio () {
    return this.hasOne('App/Models/Servicio', 'servicio_id', '_id')
  }
}

module.exports = TiendaServicio
