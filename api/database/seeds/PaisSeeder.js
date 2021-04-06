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
    _id: '60652fc0c547bd0ec7b69ab6',
    pais: 'Chile'
  },
  {
    id: 2,
    _id: '60652fc1c547bd0ec7b69ab7',
    pais: 'Colombia'
  }

]
class PaisSeeder {
  async run () {
    for (let i in paisData) {
      let pais = await Pais.findBy('id', paisData[i].id)
      if (!pais) {
        await Pais.create(paisData[i])
      } else {
        pais.id = paisData[i].id
        pais.pais = paisData[i].pais
        await pais.save()
      }
    }
    console.log('Finished Pais')
  }
}

module.exports = PaisSeeder
