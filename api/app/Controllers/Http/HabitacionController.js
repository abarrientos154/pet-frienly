'use strict'

const Habitacion = use("App/Models/Habitacion")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class HabitacionController {
  async index ({ request, response, view }) {
    let datos = await Habitacion.all()
    response.send(datos)
  }
}

module.exports = HabitacionController
