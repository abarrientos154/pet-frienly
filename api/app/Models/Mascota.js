'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mascota extends Model {
  static get fillable() {
    return ['name', 'race', 'age', 'vaccines', 'diseases', 'descripcion', 'type', 'size', 'birthdate' ]
  }
  static fieldValidationRules() {
    const rules = {
      name: "required|string",
      race: "required|string",
      type: "required|string",
      size: "required|string",
      age: "required|number"
    }
    return rules
  }
}

module.exports = Mascota
