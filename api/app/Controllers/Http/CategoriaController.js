'use strict'

const Categoria = use("App/Models/Categoria")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CategoriaController {
  async index ({ request, response, view }) {
    let datos = await Categoria.all()
    response.send(datos)
  }

  async getCategoriaById ({ request, response, params }) {
    let categoria = await Categoria.find(params.id)
    console.log(categoria)
    response.send(categoria)
  }

  async store ({ request, response, auth }) {
    // let user = await auth.getUser()
    // let codeFile = randomize('Aa0', 30)
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Categoria.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let guardar = await Categoria.create(dat)
      response.send(guardar)
    }
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
    console.log('dat', dat ,'dat');
    const validation = await validate(dat, Categoria.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let modificar = await Categoria.query().where('_id', params.id).update(dat)
      response.send(modificar)
    }
  }

  /**
  * Delete a categoria with id.
  * DELETE categorias/:id
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  */
  async destroy ({ params, request, response }) {
    let categoria = await Categoria.find(params.id)
    await categoria.delete()
    response.send(categoria)
  }
}


module.exports = CategoriaController
