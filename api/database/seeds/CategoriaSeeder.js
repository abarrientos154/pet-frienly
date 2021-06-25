'use strict'

/*
|--------------------------------------------------------------------------
| CategoriaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Categoria = use("App/Models/Categoria")
const categoriaData = [
  {
    id: 0,
    name: 'Otros'
  },
  {
    id: 1,
    name: 'Accesorios'
  },
  {
    id: 2,
    name: 'Alimentación'
  },
  {
    id: 3,
    name: 'Estética y cuidado'
  },
  {
    id: 4,
    name: 'Hogar'
  },
  {
    id: 5,
    name: 'Juguetes'
  },
  {
    id: 6,
    name: 'Ropa'
  },
  {
    id: 7,
    name: 'Salud'
  },
  {
    id: 8,
    name: 'viajes y paseo'
  }

]

class CategoriaSeeder {
  async run () {
    // await Categoria.query().delete()
    for (let i in categoriaData) {
      let categoria = await Categoria.findBy('id', categoriaData[i].id)
      if (!categoria) {
        await Categoria.create(categoriaData[i])
      } else {
        categoria.name = categoriaData[i].name
        await categoria.save()
      }
    }
    console.log('Finished Categorias')
  }
}

module.exports = CategoriaSeeder
