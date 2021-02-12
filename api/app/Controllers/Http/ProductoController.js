'use strict'
const Producto = use("App/Models/Producto")
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
    let filter = datos.filter(v => v.datos_proveedor.status === 1 && v.datos_proveedor.enable)
    response.send(filter)
  }

  async productoByProveedor ({ request, response, params }) {
    let datos = (await Producto.query().where({proveedor_id: params.proveedor_id}).fetch()).toJSON()
    response.send(datos)
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
    response.send(await Producto.find(params.id))
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
  async update ({ params, request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Producto.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      if (dat.buscar_file) {
        let codeFile = randomize('Aa0', 30)
        const profilePic = request.file('files', {
          types: ['image'],
          size: '20mb'
        })
        if (Helpers.appRoot('storage/uploads/productos')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/productos'), {
            name: codeFile,
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        const data = { name: profilePic.fileName }
        if (!profilePic.moved()) {
          return profilePic.error()
        } else {
          dat.fileName = data.name
          delete dat.buscar_file
        }
      } else { }
      let modificar = await Producto.query().where('_id', params.id).update(dat)
      response.send(modificar)
    }
  }

  /**
   * Delete a producto with id.
   * DELETE productos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let producto = await Producto.find(params.id)
    fs.unlink(`storage/uploads/productos/${producto.fileName}`, (err) => {
      if (err) throw err;
      console.log(`${producto.fileName} Eliminado por el Cliente`);
    });
    await producto.delete()
    response.send(producto)
  }
}

module.exports = ProductoController
