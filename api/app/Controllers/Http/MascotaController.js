'use strict'
const Mascota = use("App/Models/Mascota")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const path = require('path')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with necesidads
 */
class MascotaController {
  /**
   * Show a list of all necesidads.
   * GET necesidads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      console.log('sirve index');
      var user = (await auth.getUser()).toJSON();
      let pets = (await Mascota.where({ ownerId: user._id }).fetch()).toJSON()
      console.log(pets)
      response.send(pets)
    } catch (error) {
      console.error('index ' + error.name + ': ' + error.message)
    }
  }

  async mascotaByUserId ({ response, params }) {
    let datos = (await Mascota.query().where({ownerId: params.user_id}).fetch()).toJSON()
    response.send(datos)
  }

  /**
   * Render a form to be used for creating a new necesidad.
   * GET necesidads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new necesidad.
   * POST necesidads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      console.log(request.all())
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      const validation = await validate(dat, Mascota.fieldValidationRules())
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages())
      } else {
        let images = []
        if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
          for (let i = 0; i < dat.cantidadArchivos; i++) {
            let codeFile2 = randomize('Aa0', 30)
            const albumpic = request.file('files' + i, {
              types: ['image'],
              size: '20mb'
            })
            console.log('albumpic :>> ', albumpic);
            if (albumpic != null) {
              if (Helpers.appRoot('storage/uploads/pets')) {
                await albumpic.move(Helpers.appRoot('storage/uploads/pets'), {
                  name: codeFile2,
                  overwrite: true
                })
              } else {
                mkdirp.sync(`${__dirname}/storage/Excel`)
              }
              images.push(albumpic.fileName)
            }
          }
          dat.images = images
        }
        let body = dat
        delete body.cantidadArchivos
        body.ownerId = ((await auth.getUser()).toJSON())._id
        let guardar = await Mascota.create(body)
        response.send(guardar)
      }
    } catch (error) {
      console.error('store ' + error.name + ': ' + error.message)
    }
  }

  /**
   * Display a single necesidad.
   * GET necesidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Mascota.find(params.id))
  }

  /**
   * Render a form to update an existing necesidad.
   * GET necesidads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update necesidad details.
   * PUT or PATCH necesidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    let pet = await Mascota.find(params.id)
    const validation = await validate(dat, Mascota.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let images = pet.images
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('files' + dat.index[i], {
            types: ['image'],
            size: '20mb'
          })
          console.log('albumpic :>> ', profilePic);
          if (profilePic != null && images[dat.index[i]] && Helpers.appRoot('storage/uploads/pets')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/pets'), {
              name: images[dat.index[i]],
              overwrite: true
            })
          } else if (profilePic != null && Helpers.appRoot('storage/uploads/pets')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/pets'), {
              name: codeFile,
              overwrite: true
            })
            images.push(profilePic.fileName)
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
            images.push(profilePic.fileName)
          }
        }
      }
      delete dat.cantidadArchivos
      delete dat.index
      dat.images = images
      let modificar = await Mascota.where({_id: params.id}).update(dat)
      response.send(modificar)
    }
  }

  /**
   * Delete a necesidad with id.
   * DELETE necesidads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    var user = await auth.getUser();
    let { id } = params;
    let pet = (await Mascota.find(id)).toJSON();
    for (let j of pet.images) {
      fs.unlink(`storage/uploads/pets/${j}`, (err) => {
        if (err) throw err;
        console.log(`${j} Eliminado por el Cliente`);
      });
    }
    let petDestroy = (await Mascota.find(id)).delete();
    console.log('probando')
    response.send(petDestroy)

    /* let eliminar = await Mascota.find(params.id)
    for (let j of eliminar.images) {
      fs.unlink(`storage/uploads/pets/${j}`, (err) => {
        if (err) throw err;
        console.log(`${j} Eliminado por el Cliente`);
      });
    }
    eliminar.delete()
    response.send(eliminar) */
  }

}

module.exports = MascotaController
