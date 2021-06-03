'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tienda extends Model {
  static get fillable() {
    return ['id_proveedor','nombre','telefono', 'correo', 'descripcion', 'pais', 'region', 'direccion', 'hora_inicio', 'hora_cierre', 'despachosReg', 'delivery', 'deliveryM', 'deliveryG']
  }
  static fieldValidationRules() {
    const rules = {
        id_proveedor: "required|string",
      nombre: "required|string",
      telefono: "required|string",
      correo: "required|string",
      descripcion: "required|string",
      pais: "required|string",
      region: "required|string",
      direccion: "required|string",
      hora_inicio: "required|string",
      hora_cierre: "required|string",
      despachosReg: "required|string",
      delivery: "required|string",
      deliveryM: "required|string",
      deliveryG: "required|string"
    }
    return rules
  }
  datos_tienda () {
    return this.hasOne('App/Models/Tienda', 'tienda_id', '_id')
  }
}

module.exports = Tienda

