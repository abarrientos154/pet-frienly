'use strict'

const Categoria = use("App/Models/Categoria")
const { validate } = use("Validator")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CategoriaController {
  async index ({ request, response, view }) {
    let datos = await Categoria.all()
    response.send(datos)
  }
}


module.exports = CategoriaController
