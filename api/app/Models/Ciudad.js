'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ciudad extends Model {
    static get fillable() {
        return ['ciudad','pais_id']
    }
    static fieldValidationRules() {
        const rules = {
          ciudad: "required|string",
          pais_id: "required|string"
        }
        return rules
    }
    pais () {
        return this.belongsTo("App/Models/Pais", "pais_id", "_id")
    }
    static get objectIDs () {
        return ["_id", "pais_id"];
    }
    static get objectIDcity () {
        return ["ciudad_id", "_id"];
    }
}

module.exports = Ciudad
