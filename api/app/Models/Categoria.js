'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
    static get fillable() {
        return ['name','icons']
    }
    static fieldValidationRules() {
        const rules = {
          icons: "required|string",
          name: "required|string"
        }
        return rules
    }
}

module.exports = Categoria
