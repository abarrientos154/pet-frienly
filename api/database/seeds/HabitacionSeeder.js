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
const Habitacion = use("App/Models/Habitacion")
const habitacionData = [
  {
    id: 1,
    name: 'Individual',
    status: false
  },
  {
    id: 2,
    name: 'Doble',
    status: false
  },
  {
    id: 3,
    name: 'Triple',
    status: false
  }
]
class HabitacionSeeder {
  async run () {
    for (let i in habitacionData) {
      let habitacion = await Habitacion.findBy('id', habitacionData[i].id)
      if (!habitacion) {
        await Habitacion.create(habitacionData[i])
      } else {
        habitacion.name = habitacionData[i].name
        habitacion.status = habitacionData[i].status
        await habitacion.save()
      }
    }
    console.log('Finished Habitacion')
  }
}

module.exports = HabitacionSeeder
