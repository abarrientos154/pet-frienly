'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proveedor extends Model {
  static get fillable() {
    return ['nombre','apellidos','fecha_nac','telefono', 'correo', 'terminos']
  }
  static fieldValidationRules() {
    const rules = {
      nombre: "required|string",
      apellidos: "required|string",
      fecha_nac: "required|date",
      telefono: "required|string",
      correo: "required|string",
      termino: "required|boolean"
    }
    return rules
  }
  datos_proveedor () {
    return this.hasOne('App/Models/Proveedor', 'proveedor_id', '_id')
  }
}

module.exports = Proveedor
