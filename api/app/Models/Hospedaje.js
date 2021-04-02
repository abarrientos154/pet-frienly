'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hospedaje extends Model {
  static get fillable() {
    return ['name','description','price']
  }
  static fieldValidationRules() {
    const rules = {
      name: "required|string",
      description: "required|string",
      price: "required|number",
      dimensions: "required|number",
      pet_type: "required|string"
    }
    return rules
  }
  datos_proveedor () {
    return this.hasOne('App/Models/User', 'proveedor_id', '_id')
}
}

module.exports = Hospedaje
