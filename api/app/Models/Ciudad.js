'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ciudad extends Model {
    static get fillable() {
        return ['name','pais_id','ubicacion']
    }
    static fieldValidationRules() {
        const rules = {
          pais_id: "required|string",
          name: "required|string",
          ubicacion: "required"
        }
        return rules
    }
    pais () {
        return this.belongsTo("App/Models/Pais", "pais_id", "_id")
    }
    static get objectIDs () {
        return ["_id"];
    }
    static get objectIDcity () {
        return ["ciudad_id", "_id"];
    }
}

module.exports = Ciudad
