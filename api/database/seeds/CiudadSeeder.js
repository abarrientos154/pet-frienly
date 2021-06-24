'use strict'

/*
|--------------------------------------------------------------------------
| CiudadSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Ciudad = use("App/Models/Ciudad")
const ciudadData = [
  {
    id: 1,
    pais_id: 1,
    name: 'Antofagasta'
  },
  {
    id: 2,
    pais_id: 1,
    name: 'Concepcion'
  },
  {
    id: 3,
    pais_id: 1,
    name: 'Santiago'
  },
  {
    id: 4,
    pais_id: 1,
    name: 'Viña del mar'
  },
  {
    id: 5,
    pais_id: 2,
    name: 'Cali'
  },
  {
    id: 6,
    pais_id: 2,
    name: 'Cartagena'
  },
  {
    id: 7,
    pais_id: 2,
    name: 'Cúcuta'
  },
  {
    id: 8,
    pais_id: 2,
    name: 'Barranquilla'
  },
  {
    id: 9,
    pais_id: 2,
    name: 'Bogotá'
  },
  {
    id: 10,
    pais_id: 2,
    name: 'Bucaramanga'
  },
  {
    id: 11,
    pais_id: 2,
    name: 'Medellín'
  },
  {
    id: 12,
    pais_id: 2,
    name: 'Pereira'
  },
  {
    id: 13,
    pais_id: 2,
    name: 'Santamarta'
  },
  {
    id: 14,
    pais_id: 2,
    name: 'Villavicencio'
  }

]
class CiudadSeeder {
  async run () {
    // await Ciudad.query().delete()
    for (let i in ciudadData) {
      let ciudad = await Ciudad.findBy('id', ciudadData[i].id)
      if (!ciudad) {
        await Ciudad.create(ciudadData[i])
      } else {
        ciudad.pais_id = ciudadData[i].pais_id
        ciudad.name = ciudadData[i].name
        await ciudad.save()
      }
    }
    console.log('Finished Ciudad')
  }
}

module.exports = CiudadSeeder
