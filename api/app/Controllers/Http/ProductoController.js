'use strict'
const Producto = use("App/Models/Producto")
const Categoria = use("App/Models/Categoria")
const Pedidos = use("App/Models/Pedido")
const Reservas = use("App/Models/Reserva")
const Comprados = use("App/Models/Comprado")
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

  async categorias ({ request, response, view }) {
    let categorias = (await Categoria.query().where({}).fetch()).toJSON()
    response.send(categorias)
  }

  async pedidos ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let data = (await Pedidos.query().where({tienda_id: user._id}).with('productos').fetch()).toJSON()
    data = data.map(v => {
      return {
        ...v,
        detalles: false,
        newStatus: '',
        fecha_compra: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(data)
  }

  async arriendos ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let data = (await Reservas.query().where({hospedador_id: user._id}).with('representante').fetch()).toJSON()
    data = data.map(v => {
      return {
        ...v,
        detalles: false,
        dias: moment(v.fecha_salida).diff(v.fecha_ingreso, 'days'),
        expirado: moment(v.expiration) > moment() ? false : true,
        fecha_arriendo: moment(v.created_at).format('DD/MM/YYYY')
      }
    })
    response.send(data)
  }

  async pedidoStatus({ params, request, response }) {
    let dat = request.all()
    let modificar = await Pedidos.query().where('_id', params.id).update({status: dat.status})
    response.send(modificar)
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
    if (user.roles[0] === 3) {
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
    if (user.roles.some(v => v == 3)) {
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
      if (fecha < 10)
      /* fecha = '0' + fecha */
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
