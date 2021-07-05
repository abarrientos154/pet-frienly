'use strict'

const Ciudad = use("App/Models/Ciudad")
const Pais = use("App/Models/Pais")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var ObjectId = require('mongodb').ObjectId;
// var randomize = require('randomatic');
const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CiudadController {
  async index ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    const pais = await Pais.find(user.country_id)
    let datos = (await Ciudad.where({pais_id: pais.id}).fetch()).toJSON()
    response.send(datos)
  }
  async ciudadById({ params, response }) {
    const ciudad = await Ciudad.find(params.id)
    response.send(ciudad)
  }
  async cityByCountry({ params, response }) {
    const pais = await Pais.find(params.id)
    const cities = (await Ciudad.where({pais_id: pais.id}).fetch()).toJSON()
    response.send(cities)
  }
}

module.exports = CiudadController
