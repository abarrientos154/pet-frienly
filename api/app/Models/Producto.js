'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
  static get fillable() {
    return ['name','descripcion','cantidad','precio']
  }
  static fieldValidationRules() {
    const rules = {
      name: "required|string",
      precio: "required|number",
      descripcion: "required|string",
      cantidad: "required|number"
    }
    return rules
  }
  datos_proveedor () {
    return this.hasOne('App/Models/User', 'proveedor_id', '_id')
}
}

module.exports = Producto
