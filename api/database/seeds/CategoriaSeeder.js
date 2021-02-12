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
    id: 1,
    name: 'Pintura de Automóvil',
    icons: "format_paint"
  },
  {
    id: 2,
    name: 'Gruas',
    icons: "local_shipping"
  },
  {
    id: 3,
    name: 'Repuesto de Vehiculos',
    icons: "settings"
  },
  {
    id: 4,
    name: 'Desabolladura',
    icons: "build"
  },
  {
    id: 5,
    name: 'Asistencia Remota',
    icons: "support_agent"
  }

]
class CategoriaSeeder {
  async run () {
    for (let i in categoriaData) {
      let categoria = await Categoria.findBy('id', categoriaData[i].id)
      if (!categoria) {
        await Categoria.create(categoriaData[i])
      } else {
        categoria.name = categoriaData[i].name
        categoria.id = categoriaData[i].id
        categoria.icons = categoriaData[i].icons
        await categoria.save()
      }
    }
    console.log('Finished Categoria')
  }
}

module.exports = CategoriaSeeder
