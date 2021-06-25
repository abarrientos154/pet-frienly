'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
  static get fillable() {
    return ['name','descripcion','cantidad','price', 'destinatario', 'categoria_id', 'oferta', 'oferta_price', 'fecha_termino']
  }
  static fieldValidationRules() {
    const rules = {
      name: "required|string",
      price: "required|number",
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
