'use strict'

/*
|--------------------------------------------------------------------------
| ServicioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Servicio = use("App/Models/Servicio")
const servicioData = [
  {
    id: 1,
    name: 'paseo de mascota',
    icons: 'petnoimg.png'
  },
  {
    id: 2,
    name: 'corte de pelo',
    icons: 'petnoimg.png'
  },
  {
    id: 3,
    name: 'psicólogo',
    icons: 'petnoimg.png'
  },
  {
    id: 4,
    name: 'psicólogo',
    icons: 'petnoimg.png'
  },
  {
    id: 5,
    name: 'alojamiento',
    icons: 'petnoimg.png'
  }

]
class ServicioSeeder {
  async run () {
    for (let i in servicioData) {
      let servicios = await Servicio.findBy('id', servicioData[i].id)
      if (!servicios) {
        await Servicio.create(servicioData[i])
      } else {
        servicios.name = servicioData[i].name
        servicios.id = servicioData[i].id
        servicios.icons = servicioData[i].icons
        await servicios.save()
      }
    }
    console.log('Finished servicios')
  }
}

module.exports = ServicioSeeder
