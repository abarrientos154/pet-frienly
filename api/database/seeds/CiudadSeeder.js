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
    ciudad: 'Antofagasta',
    pais_id: '60652fc0c547bd0ec7b69ab6'
  },
  {
    id: 2,
    ciudad: 'Santiago',
    pais_id: '60652fc0c547bd0ec7b69ab6'
  },
  {
    id: 3,
    ciudad: 'Concepcion',
    pais_id: '60652fc0c547bd0ec7b69ab6'
  },
  {
    id: 4,
    ciudad: 'Cali',
    pais_id: '60652fc1c547bd0ec7b69ab7'
  },
  {
    id: 5,
    ciudad: 'Bogota',
    pais_id: '60652fc1c547bd0ec7b69ab7'
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
        ciudad.ciudad = ciudadData[i].ciudad
        ciudad.pais_id = ciudadData[i].pais_id
        await ciudad.save()
      }
    }
    console.log('Finished Ciudad')
  }
}

module.exports = CiudadSeeder
