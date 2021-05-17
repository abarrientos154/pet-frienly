'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pais extends Model {
    static get fillable() {
        return ['name',"ubicacion"]
    }
    static fieldValidationRules() {
        const rules = {
          name: "required|string",
          ubicacion:"required"
        }
        return rules
    }
    ciudades () {
        return this.hasMany("App/Models/Ciudad", "_id", "pais_id")
    }
    static get objectIDpais () {
        return ["pais_id", "_id"];
    }
}

module.exports = Pais
