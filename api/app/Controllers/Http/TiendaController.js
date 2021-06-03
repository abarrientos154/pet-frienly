'use strict'

const { fieldValidationRules } = require('../../Models/Ciudad')

const Tienda = use('App/Models/Tiendd')
const  { validate } = use('Validator')
const Helpers = use('Helpers')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tiendacontroladors
 */
class TiendaController {
  /**
   * Show a list of all tiendacontroladors.
   * GET tiendacontroladors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let datos = (await Tienda.query().where({}).with('datos_proveedor').fetch()).toJS
    response.send(datos)
  }

  /**
   * Render a form to be used for creating a new tiendacontrolador.
   * GET tiendacontroladors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tiendacontrolador.
   * POST tiendacontroladors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let recibir = request.all()
    const validacion = await validate(recibir, Tienda.fieldVAlidationRules())
    if(validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(Tienda.filable)
      let guardar = await Tienda.create(body)
      response.send(guardar)
    }
  }

  /**
   * Display a single tiendacontrolador.
   * GET tiendacontroladors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let Tienda = (await Tienda_id.find(params._id)).toJSON()
    Tienda.images = Tienda.images.map(ele => {
      return { src: ele }
    })
    console.log(Tienda)
    response.send(Tienda)
  }

  /**
   * Render a form to update an existing tiendacontrolador.
   * GET tiendacontroladors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tiendacontrolador details.
   * PUT or PATCH tiendacontroladors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tiendacontrolador with id.
   * DELETE tiendacontroladors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TiendaController
