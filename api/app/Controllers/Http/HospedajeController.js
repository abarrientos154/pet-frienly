'use strict'
const Hospedaje = use("App/Models/Hospedaje")
const User = use("App/Models/Hospedaje")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with hospedajes
 */
class HospedajeController {
  /**
   * Show a list of all hospedajes.
   * GET hospedajes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let datos = (await Hospedaje.query().where({}).with('datos_proveedor').fetch()).toJSON()
    //let filter = datos.filter(v => v.datos_proveedor.status === 1 && v.datos_proveedor.enable)
    response.send(datos)
  }

  async hospedajeByProveedor ({ request, response, params }) {
    let datos = (await Hospedaje.query().where({ proveedor_id: params.proveedor_id }).fetch()).toJSON()
    for (let i in datos) {
      datos[i].filename = datos[i].images[0]
    }
    console.log(datos, 'datos');
    response.send(datos)
  }

  /**
   * Render a form to be used for creating a new Hospedaje.
   * GET hospedajes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new Hospedaje.
   * POST hospedajes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let recibir = request.all()
    const validation = await validate(recibir, Hospedaje.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let body = request.only(Hospedaje.fillable)
      let guardar = await Hospedaje.create(body)
      response.send(guardar)
    }
  }

  /**
   * Display a single Hospedaje.
   * GET hospedajes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
    let user = auth.getUser()
    console.log('user :>> ', user);
    let hospedaje = (await Hospedaje.with('datos_proveedor').find(params.id)).toJSON()
    console.log('hospedaje :>> ', hospedaje);
    hospedaje.images = hospedaje.images.map(ele => {
      return { src: ele }
    })
    response.send(hospedaje)
  }

  async hospedajeFiltrado ({ params, request, response, view }) {
    let filtrar = request.all()
    console.log(filtrar)
    if (filtrar.ciudad_id && filtrar.pet_num && filtrar.habt_type) {
      let datos = (await Hospedaje.query().where('ciudad_id', filtrar.ciudad_id).where('pet_num', '>=', filtrar.pet_num).with('datos_proveedor').fetch()).toJSON()
      let filter = datos.filter(v => {
        for (let i of v.habt_types) {
          if (i.name === filtrar.habt_type) {
            return v
          }
        }
      })
      console.log('1')
      response.send(filter)
    }
    else if (filtrar.ciudad_id && filtrar.pet_num) {
      let datos = (await Hospedaje.query().where('ciudad_id', filtrar.ciudad_id).where('pet_num', '>=', filtrar.pet_num).with('datos_proveedor').fetch()).toJSON()
      console.log('2')
      response.send(datos)
    }
    else if (filtrar.pet_num && filtrar.habt_type) {
      let datos = (await Hospedaje.query().where('pet_num', '>=', filtrar.pet_num).with('datos_proveedor').fetch()).toJSON()
      let filter = datos.filter(v => {
        for (let i of v.habt_types) {
          if (i.name === filtrar.habt_type) {
            return v
          }
        }
      })
      console.log('3')
      response.send(filter)
    }
    else if (filtrar.ciudad_id && filtrar.habt_type) {
      let datos = (await Hospedaje.query().where('ciudad_id', filtrar.ciudad_id).with('datos_proveedor').fetch()).toJSON()
      let filter = datos.filter(v => {
        for (let i of v.habt_types) {
          if (i.name === filtrar.habt_type) {
            return v
          }
        }
      })
      console.log('4')
      response.send(filter)
    }
    else if (filtrar.ciudad_id) {
      let datos = (await Hospedaje.query().where('ciudad_id', filtrar.ciudad_id).with('datos_proveedor').fetch()).toJSON()
      console.log('5')
      response.send(datos)
    }
    else if (filtrar.pet_num) {
      let datos = (await Hospedaje.query().where('pet_num', '>=', filtrar.pet_num).with('datos_proveedor').fetch()).toJSON()
      console.log('6')
      response.send(datos)
    }
    else if (filtrar.habt_type) {
      let datos = (await Hospedaje.query().where({}).with('datos_proveedor').fetch()).toJSON()
      console.log(datos)
      let filter = datos.filter(v => {
        for (let i of v.habt_types) {
          if (i.name === filtrar.habt_type) {
            return v
          }
        }
      })
      console.log('7')
      response.send(filter)
    }
    else if (filtrar.fecha) {
      let datos = (await Hospedaje.query().where({}).with('datos_proveedor').fetch()).toJSON()
      response.send(datos)
    }
  }

  /**
   * Render a form to update an existing Hospedaje.
   * GET hospedajes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update Hospedaje details.
   * PUT or PATCH hospedajes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    let user = await auth.getUser()
    console.log('prueba');
    let hospedaje = (await Hospedaje.find(params.id)).toJSON()
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    console.log(dat.cantidadArchivos, 'data archivos')
    const validation = await validate(dat, Hospedaje.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let images = hospedaje.images
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('files_' + (i + 1), {
            types: ['image']
          })
          console.log(profilePic.index, 'ind')
          if (Helpers.appRoot('storage/uploads/hospedajes')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/hospedajes'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images.splice(dat.index[i], 1, profilePic.fileName)
        }
        console.log(dat.images, 'images');
        /* for (let j of dat.images) {
          fs.unlink(`storage/uploads/hospedajes/${j.src}`, (err) => {
            if (err) throw err;
            console.log(`${j.src} Eliminado por el Cliente`);
          });
        } */
        dat.images = images
      }
      dat.proveedor_id = user._id.toString()
      delete dat.cantidadArchivos
      delete dat.index
      let modificar = await Hospedaje.where('_id', params.id).update(dat)
      response.send(modificar)
    }
  }

  /**
   * Delete a hospedajes with id.
   * DELETE hospedajes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    var user = await auth.getUser();
    let { id } = params;
    let hospedaje = await Hospedaje.find(id)
    /* fs.unlink(`storage/uploads/hospedajes/${hospedaje.fileName}`, (err) => {
      if (err) throw err;
      console.log(`${hospedaje.fileName} Eliminado por el Cliente`);
    }); */
    let hospedajeDestroy = (await Hospedaje.find(id)).delete();
    response.send(hospedajeDestroy)
  }
}

module.exports = HospedajeController
