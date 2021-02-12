'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Necesidad extends Model {
  static get fillable() {
    return ['categoria_id','direccion','necesidad','descripcion', 'status']
  }
  static fieldValidationRules() {
    const rules = {
      categoria_id: "string",
      necesidad: "required|string",
      descripcion: "required|string",
      direccion: "string"
    }
    return rules
  }
  creador () {
    return this.hasOne('App/Models/User', 'ownerId', '_id')
  }
}

module.exports = Necesidad
