'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Favorito extends Model {
    datos_tienda () {
        return this.hasOne('App/Models/User', 'id_tienda', '_id')
    }
}

module.exports = Favorito
