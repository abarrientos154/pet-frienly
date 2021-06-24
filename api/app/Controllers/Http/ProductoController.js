'use strict'
const Producto = use("App/Models/Producto")
const Categoria = use("App/Models/Categoria")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with productos
 */
class ProductoController {
  /**
   * Show a list of all productos.
   * GET productos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let datos = (await Producto.query().where({}).with('datos_proveedor').fetch()).toJSON()
    let filter = datos.filter(v => v.datos_proveedor.estatus === 1)
    response.send(filter)
  }

  async productoByProveedor ({ request, response, params }) {
    let datos = (await Producto.query().where({proveedor_id: params.proveedor_id}).fetch()).toJSON()
    for (let i in datos) {
      datos[i].filename = datos[i].images[0]
    }
    console.log(datos, 'datos');
    response.send(datos)
  }

  async categorias ({ request, response, view }) {
    let categorias = (await Categoria.query().where({}).fetch()).toJSON()
    response.send(categorias)
  }

  /**
   * Render a form to be used for creating a new producto.
   * GET productos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new producto.
   * POST productos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let recibir = request.all()
    const validation = await validate(recibir, Producto.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(Producto.fillable)
      let guardar = await Producto.create(body)
      response.send(guardar)
    }
  }

  /**
   * Display a single producto.
   * GET productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let producto = (await Producto.find(params.id)).toJSON()
    producto.images = producto.images.map(ele => {
      return { src: ele }
    })
    console.log(producto)
    response.send(producto)
  }

  async productoFiltrado ({ params, request, response, view }) {
    let datos = (await Producto.query().where('categoria_id', params.filtrar).with('datos_proveedor').fetch()).toJSON()
    let filter = datos.filter(v => v.datos_proveedor.status === 1 && v.datos_proveedor.enable)
    response.send(filter)
  }

  /**
   * Render a form to update an existing producto.
   * GET productos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update producto details.
   * PUT or PATCH productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    let body = request.only(Producto.fillable())
    await Producto.query().where('_id', params.id).update(body)
    response.send(body)
  }

  /**
   * Delete a producto with id.
   * DELETE productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    let producto = await Producto.find(params.id)
    producto.delete()
    response.send(producto)
  }
}

module.exports = ProductoController
