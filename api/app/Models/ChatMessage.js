'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatMessage extends Model {
    datos_cliente () {
      return this.hasOne('App/Models/User', 'cliente_id', '_id')
    }
    datos_proveedor () {
        return this.hasOne('App/Models/User', 'proveedor_id', '_id')
    }
}

module.exports = ChatMessage
