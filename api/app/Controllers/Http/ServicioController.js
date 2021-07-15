'use strict'

const Servicio = use("App/Models/Servicio")
const TiendaServicio = use("App/Models/TiendaServicio")
const Mascota = use("App/Models/Mascota")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicios
 */
class ServicioController {
  /**
   * Show a list of all servicios.
   * GET servicios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response, view }) {
    let datos = await Servicio.all()
    response.send(datos)
  }

  async misServicios ({ response, auth }) {
    let user = await auth.getUser()
    let servicios = (await TiendaServicio.query().where({ tienda_id: user._id.toString()}).with('servicio').fetch()).toJSON()
    response.send(servicios)
  }

  async servicioByProveedor ({ response, params }) {
    let user_id = params.proveedor_id
    let servicios = (await TiendaServicio.query().where({tienda_id: user_id}).with('servicio').fetch()).toJSON()
    response.send(servicios)
  }

  async servicioByCliente ({ response, params, auth }) {
    let user = (await auth.getUser()).toJSON()
    let mascotas = (await Mascota.where({ ownerId: user._id }).fetch()).toJSON()
    var perro = mascotas.find(v => v.type === 'Perro') ? true : false
    var gato = mascotas.find(v => v.type === 'Gato') ? true : false
    let id = params.proveedor_id
    let filtrado = []
    let servicios = (await TiendaServicio.query().where({tienda_id: id}).with('servicio').fetch()).toJSON()
    for (let i = 0; i < servicios.length; i++) {
      if (gato && perro) {
        if (servicios[i].destinatario === 'Perros' || servicios[i].destinatario === 'Gatos' || servicios[i].destinatario === 'Ambos') {
          filtrado.push(servicios[i])
        }
      } else if (gato && !perro) {
        if (servicios[i].destinatario === 'Gatos' || servicios[i].destinatario === 'Ambos') {
          filtrado.push(servicios[i])
        }
      } else if (!gato && perro) {
        if (servicios[i].destinatario === 'Perros' || servicios[i].destinatario === 'Ambos') {
          filtrado.push(servicios[i])
        }
      }
    }
    response.send(filtrado)
  }

  /**
   * Render a form to be used for creating a new servicio.
   * GET servicios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    dat.tienda_id = user._id
    let servicio = await TiendaServicio.create(dat)

    const profilePic = request.file('files', {})
    if (Helpers.appRoot('storage/uploads/servicios')) {
      await profilePic.move(Helpers.appRoot('storage/uploads/servicios'), {
        name: servicio._id.toString(),
        overwrite: true
      })
    } else {
      mkdirp.sync(`${__dirname}/storage/Excel`)
    }
    if (!profilePic.moved()) {
      return profilePic.error()
    }
    response.send(servicio)
  }

  /**
   * Create/save a new servicio.
   * POST servicios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single servicio.
   * GET servicios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let servicio = (await TiendaServicio.query().where({ _id: params.id}).with('servicio').first()).toJSON()
    response.send(servicio)
  }

  /**
   * Render a form to update an existing servicio.
   * GET servicios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update servicio details.
   * PUT or PATCH servicios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let body = request.only(TiendaServicio.fillable())
    await TiendaServicio.query().where('_id', params.id).update(body)
    response.send(body)
  }

  /**
   * Delete a servicio with id.
   * DELETE servicios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let servicio = await TiendaServicio.find(params.id)
    servicio.delete()
    response.send(servicio)
  }
}

module.exports = ServicioController
