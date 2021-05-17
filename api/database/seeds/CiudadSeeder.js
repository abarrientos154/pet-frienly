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
    pais_id: '60652fc0c547bd0ec7b69ab6',
    name: 'Antofagasta',
    ubicacion: { lat: -23.65236, lng: -70.3954 }
  },
  {
    id: 2,
    pais_id: '60652fc0c547bd0ec7b69ab6',
    name: 'Santiago',
    ubicacion: { lat: -33.45694, lng: -70.64827 }
  },
  {
    id: 3,
    pais_id: '60652fc0c547bd0ec7b69ab6',
    name: 'Concepcion',
    ubicacion: { lat: -36.82699, lng: -73.04977 }
  },
  {
    id: 4,
    pais_id: '60652fc1c547bd0ec7b69ab7',
    name: 'Cali',
    ubicacion: { lat: 3.43722, lng: -76.5225 }
  },
  {
    id: 5,
    pais_id: '60652fc1c547bd0ec7b69ab7',
    name: 'Bogota',
    ubicacion: { lat: 4.60971, lng: -74.08175 }
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
        ciudad.ubicacion = ciudadData[i].ubicacion
        await ciudad.save()
      }
    }
    console.log('Finished Ciudad')
  }
}

module.exports = CiudadSeeder
