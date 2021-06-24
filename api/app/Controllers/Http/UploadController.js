'use strict'

const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const User = use("App/Models/User")
const Producto = use("App/Models/Producto")
const Hospedaje = use("App/Models/Hospedaje")
const { validate } = use("Validator")
const fs = require('fs')
var randomize = require('randomatic');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  async registrarProducto ({ request, response, auth }) {
    let user = await auth.getUser()
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Producto.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let images = []
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('files_' + (i + 1), {
            types: ['image']
          })
          if (Helpers.appRoot('storage/uploads/productos')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/productos'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images.push(profilePic.fileName)
        }
      }
      dat.proveedor_id = user._id.toString()
      delete dat.cantidadArchivos
      dat.images = images
      let guardar = await Producto.create(dat)
      response.send(guardar)
    }
  }
  async registrarHospedaje ({ request, response, auth }) {
    let user = await auth.getUser()
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Hospedaje.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      let images = []
      if (dat.cantidadArchivos && dat.cantidadArchivos > 0) {
        for (let i = 0; i < dat.cantidadArchivos; i++) {
          let codeFile = randomize('Aa0', 30)
          const profilePic = request.file('files_' + i, {
            types: ['image']
          })
          if (Helpers.appRoot('storage/uploads/hospedajes')) {
            await profilePic.move(Helpers.appRoot('storage/uploads/hospedajes'), {
              name: codeFile,
              overwrite: true
            })
          } else {
            mkdirp.sync(`${__dirname}/storage/Excel`)
          }
          images.push(profilePic.fileName)
        }
      }
      dat.hospedador_id = user._id.toString()
      delete dat.cantidadArchivos
      dat.images = images
      let guardar = await Hospedaje.create(dat)
      response.send(guardar)
    }
  }
  async getFile({
    params,
    response
  }) {
    const fileName = params.filename
    return fileName
  }

  /* async subirImgServicio ({ response, params, request }) {
    let id = params.producto_id
    var profilePic = request.file('perfil', {})
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/productos')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/productos'), {
          name: id,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        response.send(true)
      }
    }
  } */

   async subirimgtienda ({ request, response, auth }) {
    let codeFile = randomize('Aa0', 30)
    let user = await auth.getUser()
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/tiendaFiles')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/tiendaFiles'), {
          name: codeFile,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let proveedor = await User.find(user._id)
        if (proveedor.tiendaFiles) {
          proveedor.tiendaFiles.push(codeFile)
        } else {
          proveedor.tiendaFiles = []
          proveedor.tiendaFiles.push(codeFile)
        }
        proveedor.status = 0
        await proveedor.save()
        console.log(proveedor, 'proveedor buscar')
        response.send(proveedor)
      }
    }
  }

  async subirimgtiendaById ({ request, response, auth }) {
    let codeFile = randomize('Aa0', 30)
    let user = (await auth.getUser()).toJSON()
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/tiendaFiles')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/tiendaFiles'), {
          name: codeFile,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let proveedor = await User.find(user._id)
        if (proveedor.tiendaFiles) {
          proveedor.tiendaFiles.push(codeFile)
        } else {
          proveedor.tiendaFiles = []
          proveedor.tiendaFiles.push(codeFile)
        }
        await proveedor.save()
        response.send(proveedor)
      }
    }
  }

  async eliminarigmtiendaById ({ auth, response, params }) {
    let user = (await auth.getUser()).toJSON()
    let proveedor = await User.find(user._id)
    fs.unlink(`storage/uploads/tiendaFiles/${params.id}`, (err) => {
      if (err) throw err;
      console.log(`${user._id} eliminado por el proveedor`);
    })
    let buscarInd = proveedor.tiendaFiles.findIndex(v => v === params.id)
    proveedor.tiendaFiles.splice(buscarInd, 1)
    console.log (buscarInd, 'POSICION BUSCAIND')
    await proveedor.save()
    response.send(proveedor)
  }

  async newimagen ({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/perfil')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/perfil'), {
          name: 'perfil' + user._id,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let proveedor = await User.find(user._id)
        proveedor.status = 0
        proveedor = await proveedor.save()
        console.log(proveedor, 'proveedor buscar')
        user = await auth.getUser()
        response.send(user)
      }
    }
  }

  async newimagenById ({ request, response, auth }) {
    let user = (await auth.getUser()).toJSON()
    var profilePic = request.file('files', {
      types: ['image'],
      size: '25mb'
    })
    if (profilePic) {
      if (Helpers.appRoot('storage/uploads/perfil')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/perfil'), {
          name: user._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }

      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        response.send(user)
      }
    }
  }

  async eliminarigmtienda({ params, response, auth }) {
    let user = await auth.getUser()
    let proveedor = await User.find(user._id)
    fs.unlink(`storage/uploads/tiendaFiles/${params.id}`, (err) => {
      if (err) throw err;
      console.log(`${params.id} eliminado por el proveedor`);
    })
    proveedor.status = 0
    let buscarInd = proveedor.tiendaFiles.findIndex(v => v === params.id)
    proveedor.tiendaFiles.splice(buscarInd, 1)
    console.log (buscarInd, 'POSICION BUSCAIND')
    await proveedor.save()
    response.send(proveedor)
  }

  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view
  }) {}

  /**
   * Render a form to be used for creating a new upload.
   * GET uploads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}

  /**
   * Create/save a new upload.
   * POST uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response
  }) {}

  /**
   * Display a single upload.
   * GET uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing upload.
   * GET uploads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Update upload details.
   * PUT or PATCH uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a upload with id.
   * DELETE uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}

  async uploadShopImage ({ auth, request }) {
    let user = await auth.getUser()
    let shop_id = request.input('shop_id')
    let shop = await Shop.find(shop_id)
    let dir = `storage/uploads/user_${user._id}/shop_${shop_id}/logo`
    let showingDir = `user_${ user._id }-shop_${shop_id}-logo`

    if (!shop) {
      response.unprocessableEntity('El comercio no existe. Vuelva a cargar el formulario')
    }

    const shopImage = request.file('files', {
      types: ['image'],
      size: '2mb'
    })
    let fileName = `${new Date().getTime()}.${shopImage.subtype}`
    await shopImage.move(Helpers.appRoot(dir), {
      name: fileName,
      overwrite: true
    })
    if (!shopImage.moved()) {
      return shopImage.error()
    }
    if (shop.fileName) {
      fs.unlinkSync(Helpers.appRoot(`storage/uploads/${shop.fileName.split('-').join('/')}`))
    }
    shop.fileName = `${showingDir}-${fileName}`
    await shop.save()
    return shop.fileName
  }

  async getFileByDirectoryProductos({ params, response, request }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/productos') + `/${dir}`)
  }

  async getFileByDirectoryHospedajes ({ params, response, request }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/hospedajes') + `/${dir}`)
  }

  async testFile ({ params, response, request }) {
    response.download(Helpers.appRoot('storage/uploads/tiendaFiles/' + params.file))
  }

  async getFileByDirectoryEspacioDescanso ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/hospedajeFiles') + `/${dir}`)
  }

  async getFileByDirectoryTienda ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/tiendaFiles') + `/${dir}`)
  }

  async getFileByDirectoryPerfil ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/perfil') + `/${dir}`)
  }
  async getFileByDirectoryMascota ({ params, request, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/pets') + `/${dir}`)
  }

}

module.exports = UploadController
