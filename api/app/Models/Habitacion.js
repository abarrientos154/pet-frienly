'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Habitacion extends Model {
    static get fillable() {
        return ['name']
    }
    static fieldValidationRules() {
        const rules = {
          name: "required|string"
        }
        return rules
    }
}

module.exports = Habitacion
