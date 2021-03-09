'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mascota extends Model {
  static get fillable() {
    return ['name', 'race', 'age', 'vaccines', 'diseases', 'personal_descripcion']
  }
  static fieldValidationRules() {
    const rules = {
      name: "string",
      race: "required|string",
      age: "required|string",
      vaccines: "required|string",
      diseases: "required|string",
      personal_description: "required|string"
    }
    return rules
  }
}

module.exports = Mascota
