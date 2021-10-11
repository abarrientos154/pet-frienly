'use strict'
const Producto = use("App/Models/Producto")
const Mascota = use("App/Models/Mascota")
const Categoria = use("App/Models/Categoria")
const Pedidos = use("App/Models/Pedido")
const Reservas = use("App/Models/Reserva")
const Comprados = use("App/Models/Comprado")
const Comentario = use('App/Models/Comentario')
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const moment = require("moment")
moment.locale('es')
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
    datos.forEach(async v => {
      if (v.oferta) {
        if (moment(v.fecha_termino) < moment()) {
          v.oferta = false
          await Producto.query().where({_id: v._id}).update(v)
        }
      }
    });
    response.send(datos)
  }

  async productoByCliente ({ auth, response, params }) {
    let user = (await auth.getUser()).toJSON()
    let mascotas = (await Mascota.where({ ownerId: user._id }).fetch()).toJSON()
    var perro = mascotas.find(v => v.type === 'Perro') ? true : false
    var gato = mascotas.find(v => v.type === 'Gato') ? true : false
    let filtrado = []
    let datos = (await Producto.query().where({proveedor_id: params.proveedor_id}).fetch()).toJSON()
    datos.forEach(async v => {
      if (v.oferta) {
        if (moment(v.fecha_termino) < moment()) {
          v.oferta = false
          await Producto.query().where({_id: v._id}).update(v)
        }
      }
    });
    for (let i = 0; i < datos.length; i++) {
      if (gato && perro) {
        if (datos[i].destinatario === 'Perros' || datos[i].destinatario === 'Gatos' || datos[i].destinatario === 'Ambos') {
          filtrado.push(datos[i])
        }
      } else if (gato && !perro) {
        if (datos[i].destinatario === 'Gatos' || datos[i].destinatario === 'Ambos') {
          filtrado.push(datos[i])
        }
      } else if (!gato && perro) {
        if (datos[i].destinatario === 'Perros' || datos[i].destinatario === 'Ambos') {
          filtrado.push(datos[i])
        }
      }
    }
    response.send(filtrado)
  }

  async categorias ({ request, response, view }) {
    let categorias = (await Categoria.query().where({}).fetch()).toJSON()
    response.send(categorias)
  }

  async categoriasByUser ({ params, response, auth }) {
    let categorias = (await Categoria.query().where({}).fetch()).toJSON()
    let productos = (await Producto.query().where({proveedor_id: params.id}).fetch()).toJSON()
    let filtrado = categorias.filter(v => {
      if (productos.find(c => c.categoria_id === v._id)) {
        return v
      }
    })
    response.send(filtrado)
  }

  async categoriasByCliente ({ params, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    let mascotas = (await Mascota.where({ ownerId: user._id }).fetch()).toJSON()
    var perro = mascotas.find(v => v.type === 'Perro') ? true : false
    var gato = mascotas.find(v => v.type === 'Gato') ? true : false
    let filtrado = []
    let categorias = (await Categoria.query().where({}).fetch()).toJSON()
    let productos = (await Producto.query().where({proveedor_id: params.id}).fetch()).toJSON()
    for (let i = 0; i < productos.length; i++) {
      if (gato && perro) {
        if (productos[i].destinatario === 'Perros' || productos[i].destinatario === 'Gatos' || productos[i].destinatario === 'Ambos') {
          filtrado.push(productos[i])
        }
      } else if (gato && !perro) {
        if (productos[i].destinatario === 'Gatos' || productos[i].destinatario === 'Ambos') {
          filtrado.push(productos[i])
        }
      } else if (!gato && perro) {
        if (productos[i].destinatario === 'Perros' || productos[i].destinatario === 'Ambos') {
          filtrado.push(productos[i])
        }
      }
    }
    let respuesta = categorias.filter(v => {
      if (filtrado.find(c => c.categoria_id === v._id)) {
        return v
      }
    })
    response.send(respuesta)
  }

  async pedidos ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let data
    if (user.roles[0] === 2) {
      data = (await Pedidos.query().where({cliente_id: user._id}).with('productos').with('calificacion').fetch()).toJSON()
    } else {
      data = (await Pedidos.query().where({tienda_id: user._id}).with('productos').with('calificacion').fetch()).toJSON()
    }
    data = data.map(v => {
      return {
        ...v,
        detalles: false,
        newStatus: user.roles[0] === 2 ? 'Enviado' : 'En local',
        fecha_compra: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(data)
  }

  async arriendos ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let data
    if (user.roles[0] === 2) {
      data = (await Reservas.query().where({cliente_id: user._id}).with('representante').with('calificacion').fetch()).toJSON()
    } else {
      data = (await Reservas.query().where({hospedador_id: user._id}).with('representante').with('calificacion').fetch()).toJSON()
    }
    data = data.map(v => {
      return {
        ...v,
        detalles: false,
        dias: v.fechasReserva.length,
        expirado: moment(v.fechasReserva[v.fechasReserva.length - 1]) > moment() ? false : true,
        fecha_arriendo: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(data)
  }

  async reservasByHospedajeId ({ params, response, auth }) {
    let data = (await Reservas.query().where({hospedaje_id: params.hospedaje_id}).with('representante').with('calificacion').fetch()).toJSON()
    data = data.map(v => {
      return {
        ...v,
        dias: v.fechasReserva.length,
        expirado: moment(v.fechasReserva[v.fechasReserva.length - 1]) > moment() ? false : true,
        fecha_arriendo: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    let respuesta = data.filter(v => !v.expirado)
    let arrayFechas = []
    respuesta.forEach(v => {
      arrayFechas = arrayFechas.concat(v.fechasReserva)
    })
    response.send(arrayFechas)
  }

  async pedidoStatus({ params, request, response }) {
    let dat = request.all()
    let modificar = await Pedidos.query().where('_id', params.id).update({status: dat.status})
    response.send(modificar)
  }

  async calificarTienda ({ request, response }) {
    var data = request.all()
    var comentario = await Comentario.create(data)
    let modificar
    if (data.pedido_id) {
      modificar = await Pedidos.query().where({_id: data.pedido_id}).update({calificado: true})
    } else if (data.alojamiento_id) {
      modificar = await Reservas.query().where({_id: data.alojamiento_id}).update({calificado: true})
    }
    response.send(comentario)
  }

  async traerComentarios ({ request, response, params }) {
    let id = params.id
    var comentarios = (await Comentario.query().where({tienda_id: id}).fetch()).toJSON()
    response.send(comentarios)
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

  async pre_pago_tienda ({request, response}) {
    var data = request.all().dat
    var productos = request.all().carrito
    data.productos_total = productos.length
    data.status = 'En Local'
    data.type = 1
    var compra = await Pedidos.create(data)
    for (let i = 0; i < productos.length; i++) {
      var dat = productos[i]
      dat.pedido_id = compra._id
      delete dat.cantidad
      var producto = await Comprados.create(dat) 
    }
    response.send(true)
  }

  async arrendarEspacio ({request, response}) {
    var data = request.all().dat
    var arriendo = await Reservas.create(data)
    response.send(true)
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
    let producto = (await Producto.query().where({_id: params.id}).with('categoria').first()).toJSON()
    response.send(producto)
  }

  async ventasDiarias ({ params, request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    var total = 0
    if (user.roles[0] === 3 || user.roles[0] === 5) {
      let pedidos = (await Pedidos.query().where({tienda_id: user._id}).fetch()).toJSON()
      pedidos.forEach(v => {
        if (moment(v.created_at).format('YYYY/MM/DD') === moment().format('YYYY/MM/DD')) {
          total = total + v.totalValor
        }
      })
    } else {
      let arriendos = (await Reservas.query().where({hospedador_id: user._id}).fetch()).toJSON()
      arriendos.forEach(v => {
        if (moment(v.created_at).format('YYYY/MM/DD') === moment().format('YYYY/MM/DD')) {
          total = total + v.total
        }
      })
    }
    response.send(total)
  }

  async crearEstadistica ({ request, response, auth }) {
    let data = request.all()
    const Modelo = use(`App/Models/${data.modelo}`)
    let user = await auth.getUser()
    var objParam
    if (user.roles.some(v => v == 3 || v == 5)) {
      objParam = {
        tienda_id: String(user._id)
      }
    } else {
      objParam = {
        hospedador_id: String(user._id)
      }
    }
    var fecha = data.fecha
    let ventas = (await Modelo.query().where(objParam).fetch()).toJSON()
    let todas = []
    var respuesta = [['Gün', 'Monto']]
    if (data.type === 'Anual') {
      todas = ventas.filter(v => moment(v.created_at).year() == fecha)
      for (let i = 1; i < 13; i++) {
        var arr = todas.filter(v => (moment(v.created_at).month() + 1) == i)
        var num = 0
        for (let j = 0; j < arr.length; j++) {
          num += arr[j][data.campo]
        }
        var nuevo = [String(moment().month(i-1).format('MMM')), num]
        respuesta.push(nuevo)
      }
    } else if (data.type === 'Mensual') {
      todas = ventas.filter(v => moment(v.created_at).format('YYYY/MM') == moment().format('YYYY') + '/' + fecha)
      var num = 0
      for (let j = 0; j < todas.length; j++) {
        num += todas[j][data.campo]
      }
      var nuevo = [String(moment().month(fecha-1).format('MMMM')), num]
      respuesta.push(nuevo)
    } else {
      todas = ventas.filter(v => {
        if (moment(v.created_at).format('YYYY/MM/DD') >= fecha.from && moment(v.created_at).format('YYYY/MM/DD') <= fecha.to) {
          return v
        }
      })
      var dd = moment(fecha.from).dayOfYear() - 1
      for (let i = 1; i < 8; i++) {
        var arr = todas.filter(v => (moment(v.created_at).dayOfYear()) == dd + i)
        var num = 0
        for (let j = 0; j < arr.length; j++) {
          num += arr[j][data.campo]
        }
        var name = moment().dayOfYear(dd+i)
        var nuevo = [String(moment(name).date()), num]
        respuesta.push(nuevo)
      }

    }
    response.send(respuesta)
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
    let body = request.only(Producto.fillable)
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
