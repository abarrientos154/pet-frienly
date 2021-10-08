"use strict";

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const fs = require('fs')
var randomize = require('randomatic');
const User = use("App/Models/User")
const Servicio = use("App/Models/Servicio")
const TiendaServicio = use("App/Models/TiendaServicio")
const Producto = use("App/Models/Producto")
const Mascota = use("App/Models/Mascota")
const Hospedaje = use("App/Models/Hospedaje")
const Comentario = use('App/Models/Comentario')
const Role = use("App/Models/Role")
const { validate } = use("Validator")
const Pais = use("App/Models/Pais")
const Ciudad = use("App/Models/Ciudad")
const Email = use("App/Functions/Email")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let users = await User.all();
    response.send(users);
  }

  async show({ request, response, auth }) {
    user_id = ((await auth.getUser()).toJSON())._id
    let modelo = {
      accion: 'show',
      modelo: 'User',
      unique_key: { field: '_id', value: user_id }
    }
    let data = await Crud.crud(modelo)
    response.send(data)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async registerProveedor({ request, response }) {
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      const validation = await validate(dat, User.fieldValidationRulesProveedor())
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages())
      } else if (((await User.where({email: dat.email}).fetch()).toJSON()).length) {
        response.unprocessableEntity([{
          message: 'Correo ya registrado en el sistema!'
        }])
      } else {
        let images_ident = []
        for (let i = 0; i < 2; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('IFiles' + i, {
            types: ['image']
          })
          if (Helpers.appRoot('storage/uploads/identificacionFiles')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/identificacionFiles'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images_ident.push(profilePic.fileName)
        }

        let body = dat
        body.estatus = 0 // Estatus para verificacion del Proveedor
        body.roles = [3]
        body.images_ident = images_ident
        body.tienda.calificacion = 0
        const user = await User.create(body)

        const profilePic2 = request.file('PFiles', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/tiendaFiles')) {
          await profilePic2.move(Helpers.appRoot('storage/uploads/tiendaFiles'), {
            name: user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }

        const profilePic3 = request.file('RFiles', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/perfil')) {
          await profilePic3.move(Helpers.appRoot('storage/uploads/perfil'), {
            name: user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        const data = { name: profilePic3.fileName }
        response.send(user)
      }
  }

  async registerServidor({ request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, User.fieldValidationRulesProveedor())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: dat.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!'
      }])
    } else {
      let images_ident = []
      for (let i = 0; i < 2; i++) {
        let codeFile = randomize('Aa0', 30)
        const profilePic = request.file('IFiles' + i, {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/identificacionFiles')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/identificacionFiles'), {
            name: codeFile,
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        images_ident.push(profilePic.fileName)
      }

      let body = dat
      body.estatus = 0 // Estatus para verificacion del Servidor
      body.roles = [5]
      body.images_ident = images_ident
      body.tienda.calificacion = 0
      const user = await User.create(body)

      const profilePic2 = request.file('PFiles', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/tiendaFiles')) {
        await profilePic2.move(Helpers.appRoot('storage/uploads/tiendaFiles'), {
          name: user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      const profilePic3 = request.file('RFiles', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/perfil')) {
        await profilePic3.move(Helpers.appRoot('storage/uploads/perfil'), {
          name: user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      const data = { name: profilePic3.fileName }
      response.send(user)
    }
}

  async editProveedor({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let body = request.all()
    delete body.tienda.country
    delete body.tienda.city
    let editar = await User.query().where('_id', user._id).update(body)
    response.send(editar)
  }

  async updateClient({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let body = request.all()
    let editar = await User.query().where('_id', user._id).update(body)
    response.send(editar)
  }

  async registerClient({ request, response }) {
      let dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      const validation = await validate(dat, User.fieldValidationRulesProveedor())
      if (validation.fails()) {
        response.unprocessableEntity(validation.messages())
      } else if (((await User.where({email: dat.email}).fetch()).toJSON()).length) {
        response.unprocessableEntity([{
          message: 'Correo ya registrado en el sistema!'
        }])
      } else {
        let body = dat
        const rol = 2 // Rol Cliente
        body.roles = [rol]
        const user = await User.create(body)
        const profilePic = request.file('perfilFile', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/perfil')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/perfil'), {
            name: user._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        const data = { name: profilePic.fileName }
        response.send(user)
      }
    }


  async registerHospedador({ request, response }) {
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, User.fieldValidationRulesProveedor())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: dat.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!'
      }])
    } else {
      let images = []
      for (let i = 0; i < 2; i++) {
        let codeFile = randomize('Aa0', 30)
        const profilePic = request.file('IFiles' + i, {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/identificacionFiles')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/identificacionFiles'), {
            name: codeFile,
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
        images.push(profilePic.fileName)
      }
      let body = dat
      body.status = 0 // Estatus para verificacion del Proveedor
      body.roles = [4]
      body.images_ident = images
      body.my_space.qualification = 0
      const user = await User.create(body)

      const profilePic2 = request.file('PFiles', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/hospedejeFiles')) {
        await profilePic2.move(Helpers.appRoot('storage/uploads/hospedajeFiles'), {
          name: user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      const profilePic3 = request.file('RLFiles', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/perfil')) {
        await profilePic3.move(Helpers.appRoot('storage/uploads/perfil'), {
          name: user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      response.send(user)
    }
  }

  async editHospedador({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let body = request.all()
    let modificar = await User.where('_id', user._id).update(body)
    response.send(modificar)
  }

  async filtrarTiendas({ response, request, auth }) {
    let typePet = request.all().type
    let city = request.all().ciudad
    let allTiendas = (await User.query().where({$or: [{roles: [3]}, {roles: [5]}]}).fetch()).toJSON()
    let tiendas
    let tiendasFilter = []

    if (city === false) {
      tiendas = allTiendas
    } else {
      tiendas = allTiendas.filter(v => v.tienda.city_id === city._id)
    }

    if (typePet === false) {
      tiendasFilter = tiendas
    } else {
      if (typePet === 'Ambos') {
        tiendasFilter = tiendas
      } else {
        for (let i = 0; i < tiendas.length; i++) {
          let producto = (await Producto.query().where({destinatario: typePet, proveedor_id: tiendas[i]._id}).fetch()).toJSON()
          let servicio = (await TiendaServicio.query().where({destinatario: typePet, tienda_id: tiendas[i]._id}).fetch()).toJSON()
          if (producto.length || servicio.length) {
            tiendasFilter.push(tiendas[i])
          }
        }
      }
    }

    for (let i in tiendasFilter) {
      tiendasFilter[i].city = (await Ciudad.find(tiendasFilter[i].tienda.city_id)).name
      var cal = []
      cal = (await Comentario.query().where({tienda_id: tiendasFilter[i]._id}).fetch()).toJSON()
      var total = 0
      if (cal.length) {
        cal.forEach(v => {
          total += v.calificacion
        })
        tiendasFilter[i].calificacion = (total / cal.length)
      } else {
        tiendasFilter[i].calificacion = total
      }
    }

    response.send(tiendasFilter)
  }

  async filtrarAlojamientos({ response, request }) {
    let typePet = request.all().type
    let city = request.all().ciudad
    let allHost = (await User.query().where({roles: [4]}).fetch()).toJSON()
    let host
    let hostFilter = []

    if (city === false) {
      host = allHost
    } else {
      host = allHost.filter(v => v.my_space.ciudad_id === city._id)
    }

    if (typePet === false) {
      hostFilter = host
    } else {
      if (typePet === 'Ambos') {
        hostFilter = host
      } else {
        for (let i = 0; i < host.length; i++) {
          let alojamientos = (await Hospedaje.query().where({pet_type: typePet, hospedador_id: host[i]._id}).fetch()).toJSON()
          if (alojamientos.length) {
            hostFilter.push(host[i])
          }
        }
      }
    }

    for (let i in hostFilter) {
      hostFilter[i].city = (await Ciudad.find(hostFilter[i].my_space.ciudad_id)).name
      var cal = []
      cal = (await Comentario.query().where({tienda_id: hostFilter[i]._id}).fetch()).toJSON()
      var total = 0
      if (cal.length) {
        cal.forEach(v => {
          total += v.calificacion
        })
        hostFilter[i].calificacion = (total / cal.length)
      } else {
        hostFilter[i].calificacion = total
      }
    }

    response.send(hostFilter)
  }

  async validateEmail({ request, response, params }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!',
        error: true
      }])
    } else {
      response.send({error: false})
    }
  }

  async allUser({ request, response, auth }) {
    let allUsers = (await User.query().where({}).fetch()).toJSON()
    let users = allUsers.filter(v => v.email !== 'admin@triyus.com')
    response.send(users)
  }

  async userLogueado({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    if (user.roles[0] === 3) {
      let country = await Pais.find(user.tienda.country_id)
      let city = await Ciudad.find(user.tienda.city_id)
      user.tienda.country = country
      user.tienda.city = city
    }
    response.send(user)
  }

  async userInfo({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    user.formatSer = []
    if (user.servicios) {
      for (let i of user.servicios) {
        let serv = await Servicio.findBy('id', i)
        user.formatSer.push(serv)
      }
    }
    let ciudad = ''
    let pais = ''
    if (user.ciudad_id && user.pais_id) {
      let objCiudad = await Ciudad.find(user.ciudad_id)
      ciudad = objCiudad.ciudad
      let objPais = await Pais.find(user.pais_id)
      pais = objPais.pais
    }
    user.paisName = pais
    user.ciudadName = ciudad
    let ciudadhotel = ''
    let paishotel = ''
    if (user.hoteleria.ciudad_id && user.hoteleria.pais_id) {
      let objCiudad = await Ciudad.find(user.hoteleria.ciudad_id)
      ciudadhotel = objCiudad.ciudad
      let objPais = await Pais.find(user.hoteleria.pais_id)
      paishotel = objPais.pais
    }
    user.hoteleria.paisName = paishotel
    user.hoteleria.ciudadName = ciudadhotel
    response.send(user)
  }

  async userById({ params, response }) {
    const user = await User.find(params.id)
    let ciudad = ''
    let pais = ''
    if (user.hoteleria.ciudad && user.hoteleria.pais_id) {
      let objCiudad = await Ciudad.find(user.hoteleria.ciudad)
      ciudad = objCiudad.ciudad
      let objPais = await Pais.find(user.hoteleria.pais_id)
      pais = objPais.pais
    }
    user.hoteleria.paisName = pais
    user.hoteleria.ciudadName = ciudad
    response.send(user)
  }
  async clientById({ params, response }) {
    const user = await User.find(params.id)
    user.country = await Pais.find(user.country_id)
    user.city = await Ciudad.find(user.city_id)
    response.send(user)
  }

  async tiendaById({ params, response }) {
    const user = (await User.query().where({_id: params.id}).first()).toJSON()
    let country = await Pais.find(user.tienda.country_id)
    let city = await Ciudad.find(user.tienda.city_id)
    user.tienda.country = country
    user.tienda.city = city

    var cal = (await Comentario.query().where({tienda_id: params.id}).fetch()).toJSON()
    var total = 0
    if (cal.length) {
      cal.forEach(v => {
        total += v.calificacion
      })
      user.tienda.calificacion = (total / cal.length)
    } else {
      user.tienda.calificacion = total
    }
    response.send(user)
  }

  async hospedajeById({ params, response }) {
    const user = (await User.query().where({_id: params.id}).first()).toJSON()
    let country = await Pais.find(user.my_space.pais_id)
    let city = await Ciudad.find(user.my_space.ciudad_id)
    user.my_space.country = country
    user.my_space.city = city

    var cal = (await Comentario.query().where({tienda_id: params.id}).fetch()).toJSON()
    var total = 0
    if (cal.length) {
      cal.forEach(v => {
        total += v.calificacion
      })
      user.my_space.calificacion = (total / cal.length)
    } else {
      user.my_space.calificacion = total
    }
    response.send(user)
  }

  async userByRol({ request, auth, response }) {
    try {
      let logueado = (await auth.getUser()).toJSON()
      let mascotas = (await Mascota.where({ ownerId: logueado._id }).fetch()).toJSON()
      var perro = mascotas.find(v => v.type === 'Perro') ? true : false
      var gato = mascotas.find(v => v.type === 'Gato') ? true : false
      let tiene = []
      let filtrado
      let rol = request.all()

      const userOld = (await User.query().where({}).fetch()).toJSON()
      const user = userOld.filter(v => {
        if (rol.rol.find(x => x === v.roles[0])) {
          return v
        } else {
          return false
        }
      })

      if (rol.rol.find(v => v === 3 || v === 5)) {
        for (let i in user) {
          user[i].city = (await Ciudad.find(user[i].tienda.city_id)).name
          var cal = []
          cal = (await Comentario.query().where({tienda_id: user[i]._id}).fetch()).toJSON()
          var total = 0
          if (cal.length) {
            cal.forEach(v => {
              total += v.calificacion
            })
            user[i].calificacion = (total / cal.length)
          } else {
            user[i].calificacion = total
          }
        }

        for (let m = 0; m < user.length; m++) {
          var prod = (await Producto.query().where({proveedor_id: user[m]._id}).fetch()).toJSON()
          var serv = (await TiendaServicio.query().where({tienda_id: user[m]._id}).fetch()).toJSON()
          if (gato && perro) {
            if (prod.find(v => v.destinatario === 'Perros' || v.destinatario === 'Gatos' || v.destinatario === 'Ambos') || serv.find(v => v.destinatario === 'Perros' || v.destinatario === 'Gatos' || v.destinatario === 'Ambos')) {
              tiene.push(user[m])
            }
          } else if (gato && !perro) {
            if (prod.find(v => v.destinatario === 'Gatos' || v.destinatario === 'Ambos') || serv.find(v => v.destinatario === 'Gatos' || v.destinatario === 'Ambos')) {
              tiene.push(user[m])
            }
          } else if (!gato && perro) {
            if (prod.find(v => v.destinatario === 'Perros' || v.destinatario === 'Ambos') || serv.find(v => v.destinatario === 'Perros' || v.destinatario === 'Ambos')) {
              tiene.push(user[m])
            }
          }
        }
        filtrado = tiene.filter(v => v.tienda.city_id === logueado.city_id)
      } else if (rol.rol[0] == 4) {
        for (let i in user) {
          user[i].city = (await Ciudad.find(user[i].my_space.ciudad_id)).name
          user[i].country = (await Pais.find(user[i].my_space.pais_id)).name
          var cal = []
          cal = (await Comentario.query().where({tienda_id: user[i]._id}).fetch()).toJSON()
          var total = 0
          if (cal.length) {
            cal.forEach(v => {
              total += v.calificacion
            })
            user[i].calificacion = (total / cal.length)
          } else {
            user[i].calificacion = total
          }
        }

        for (let m = 0; m < user.length; m++) {
          var hosp = (await Hospedaje.query().where({hospedador_id: user[m]._id}).fetch()).toJSON()
          if (gato && perro) {
            if (hosp.find(v => v.pet_type === 'Perros' || v.pet_type === 'Gatos' || v.pet_type === 'Ambos')) {
              tiene.push(user[m])
            }
          } else if (gato && !perro) {
            if (hosp.find(v => v.pet_type === 'Gatos' || v.pet_type === 'Ambos')) {
              tiene.push(user[m])
            }
          } else if (!gato && perro) {
            if (hosp.find(v => v.pet_type === 'Perros' || v.pet_type === 'Ambos')) {
              tiene.push(user[m])
            }
          }
        }
        filtrado = tiene.filter(v => v.my_space.ciudad_id === logueado.city_id)
      }
      response.send(filtrado)
    } catch (error) {
      console.error('user by rol: ' + error.name + ':' + error.message)
    }
  }

  async userByRolNoLogueo({ request, params, response }) {
    try {
      let rol = request.all()
      const userOld = (await User.query().where({}).fetch()).toJSON()
      const user = userOld.filter(v => {
        if (rol.rol.find(x => x === v.roles[0])) {
          return v
        } else {
          return false
        }
      })
      if (rol.rol.find(v => v === 3 || v === 5)) {
        for (let i in user) {
          user[i].city = (await Ciudad.find(user[i].tienda.city_id)).name
          var cal = []
          cal = (await Comentario.query().where({tienda_id: user[i]._id}).fetch()).toJSON()
          var total = 0
          if (cal.length) {
            cal.forEach(v => {
              total += v.calificacion
            })
            user[i].calificacion = (total / cal.length)
          } else {
            user[i].calificacion = total
          }
        }
      } else if (rol.rol[0] == 4) {
        for (let i in user) {
          user[i].city = (await Ciudad.find(user[i].my_space.ciudad_id)).name
          user[i].country = (await Pais.find(user[i].my_space.pais_id)).name
          var cal = []
          cal = (await Comentario.query().where({tienda_id: user[i]._id}).fetch()).toJSON()
          var total = 0
          if (cal.length) {
            cal.forEach(v => {
              total += v.calificacion
            })
            user[i].calificacion = (total / cal.length)
          } else {
            user[i].calificacion = total
          }
        }
      }
      response.send(user)
    } catch (error) {
      console.error('user by rol: ' + error.name + ':' + error.message)
    }
  }

  async userByStatus({ request, params, response }) {
    let rol = request.all()
    const user = (await User.query().where({roles: rol.rol, estatus: 0}).fetch()).toJSON()
    response.send(user)
  }

  async userByStatushotel({ request, params, response }) {
    let rol = request.all()
    const user = (await User.query().where({roles: rol.rol, estatusHotel: 0}).fetch()).toJSON()
    response.send(user)
  }

  async userEnable({ params, request, response }) {
    let dat = request.all()
    let modificar = await User.query().where('_id', params.id).update({enable: dat.enable})
    response.send(modificar)
  }

  async userStatus({ params, request, response }) {
    let dat = request.all()
    let modificar = await User.query().where('_id', params.id).update({estatus: dat.estatus})
    response.send(modificar)
  }

  async userStatushotel({ params, request, response }) {
    let dat = request.all()
    let modificar = await User.query().where('_id', params.id).update({estatusHotel: dat.estatusHotel})
    response.send(modificar)
  }

  async update({ request, response, params }) {
    let modelo = {
      accion: 'update',
      validar: {
        validar: true,
        datos: { name: 'string', last_name: 'string' }
      },
      modelo: 'User',
      autor: false,
      request: request.all(),
      requestOnly: request.only(['name', 'last_name']),
      unique_key: { field: '_id', value: (request.only(['_id']))._id }
    }
    let data = await Crud.crud(modelo)
    if (data.error) {
      response.unprocessableEntity([{
        message: data.msg
      }])
    } else { response.send(data) }
  }

  async destroy({ params, request, response }) {
    const { id } = params;
    const user = await User.find(id);
    await user.delete();
  }

  async login({ auth, request }) {
    const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    const user = (await User.findBy('email', email)).toJSON()
    let isUser = false
    token.roles = user.roles.map(roleMap => {
      if (roleMap === 3) {
        isUser = true
      }
      return roleMap
    })
    let userRoles = await Role.whereIn('id', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2)
      })
    })

    token.email = user.email
    token.estatus = user.estatus
    token.full_name = user.full_name ? user.full_name : null
    token.last_name = user.last_name
    let data = {}
    data.TRI_SESSION_INFO = token
    return data
  }

  showUser({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile";
    }
    return auth.user;
  }

    async userData({
      response,
      auth
    }) {
      let user = (await auth.getUser()).toJSON()
      for (let x = 0; x < user.roles.length; x++) {
        var s  = [user]
        const element = user.roles[x];
         if (element == 3) {
          /*  var s = await Country.query().where({
             _id: user.country
           }).with('user').fetch() */
         }
        if (element == 4) {
           var s = await Shop.query().where({
             user_id: user._id
           }).with('user').fetch()
        }
        if (element == 5) {
          var s = await Carrier.query().where({
            user_id: user._id
          }).with('user').fetch()
        }
      }
      response.send(s)
    }

    async updatedata ({ params, request, response }) {
      let body = request.only(User.fillablePerfil)
      let verificacion = body.cambioSoloClave
      let cambioClave = body.cambioClave
      let contraseña = body.password
      let cambiohotel = body.cambiohotel
      delete body.password
      delete body.cambioSoloClave
      delete body.cambioClave
      delete body.cambiohotel
      if (verificacion) {
        const editarcontraseña = await User.find(params.id)
        editarcontraseña.password = contraseña
        await editarcontraseña.save()
      } else {
        body.estatus = 0
        await User.query().where({_id: params.id}).update(body)

        if (!body.hoteleria) {
          let user = await User.find(params.id)
          if (user.hoteleria) {
            user.hoteleria = {}
            user.estatusHotel = 6
            await user.save()
          }
        }
        if (cambiohotel) {
          let user = await User.find(params.id)
          user.estatusHotel = 0
          await user.save()
        }

        if (cambioClave) {
          const editarcontraseña = await User.find(params.id)
          editarcontraseña.password = contraseña
          await editarcontraseña.save()
        }
      }
      response.send(body)
    }

    async recuperacionapp ({ request, response, params }) {
      if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
        let codigo = randomize('Aa0', 30)
        await User.query().where({email: params.email}).update({codigoRecuperacion: codigo})
        let mail = await Email.sendMail(params.email, 'Recuperacion de Correo', `
            <center>
              <img src="https://petfriendly.eichechile.com/api/obtener_logo" alt="logo" />
            </center>
            <h2 style="text-align:center">
              Haz solicitado restablecer tu contraseña
            </h2>
            <div style="text-align:center">
              Ingrese al link https://app.petfriendlyrecuperacion.com/recuperacion?codigo=${codigo} para restablecer su contraseña
            </div>
            `)
          console.log(mail)
          response.send(mail)
      } else {
        response.unprocessableEntity([{
          message: 'Correo no registrado en el sistema!',
          error: true
        }])
      }
    }

    async actualizarPass({ request, response, params }) {
      let user = await User.findBy('codigoRecuperacion', params.code)
      let data = request.only(['password'])
      user.password = data.password
      user.codigoRecuperacion = null
      await user.save()
      response.send(user)
    }

}

module.exports = UserController;
