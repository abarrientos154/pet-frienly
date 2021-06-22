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
      pet_type: "required"
    }
    return rules
  }
  datos_hospedador () {
    return this.hasOne('App/Models/User', 'hospedador_id', '_id')
}
}

module.exports = Hospedaje
