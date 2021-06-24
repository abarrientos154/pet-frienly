'use strict'

/*
|--------------------------------------------------------------------------
| PaisSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Pais = use("App/Models/Pais")
const paisData = [
  {
    id: 1,
    name: 'Chile',
    ubicacion: { lat: -35.675147, lng: -71.542969 }
  },
  {
    id: 2,
    name: 'Colombia',
    ubicacion: { lat: 4.570868, lng: -74.297333 }
  }

]
class PaisSeeder {
  async run () {
    for (let i in paisData) {
      let pais = await Pais.findBy('id', paisData[i].id)
      if (!pais) {
        await Pais.create(paisData[i])
      } else {
        pais.name = paisData[i].name
        pais.ubicacion =paisData[i].ubicacion
        await pais.save()
      }
    }
    console.log('Finished Pais')
  }
}

module.exports = PaisSeeder
