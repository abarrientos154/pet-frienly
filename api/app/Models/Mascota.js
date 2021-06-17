'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mascota extends Model {
  static get fillable() {
    return ['name', 'race', 'age', 'vaccines', 'diseases', 'descripcion', 'type', 'size', ]
  }
  static fieldValidationRules() {
    const rules = {
      name: "required|string",
      race: "required|string",
      type: "required|string",
      size: "required|string",
      // age: "required|string",
      // vaccines: "required|string",
      // diseases: "required|string",
      description: "required|string"
    }
    return rules
  }
}

module.exports = Mascota
