<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary row items-center" style="width:100%; height:60px">
      <div class="col-1">
        <q-btn flat round color="white" icon="arrow_back" @click="$router.go(-1)"/>
      </div>
      <div class="col-10 text-white text-subtitle1 text-center">{{hospedaje.name}}</div>
    </q-header>

      <div class="q-pt-xl">
        <q-carousel v-model="slide" style="height: 200px; border-bottom-left-radius: 15px; border-bottom-right-radius: 15px" transition-prev="jump-right" transition-next="jump-left" swipeable animated prev-icon="arrow_left" next-icon="arrow_right" navigation arrows>
          <q-carousel-slide v-for="(img, index) in hospedaje.images" :key="index" :name="index" :img-src="baseu + img.src"/>
        </q-carousel>
        <div class="q-pa-md">
          <div class="q-mb-md">
            <div class="text-subtitle1 q-mb-sm">Conoce nuestro alojamiento</div>
            <div class="text-subtitle3 text-grey-6">{{hospedaje.description}}</div>
          </div>
          <div class="q-mb-lg">
            <div class="text-subtitle1 text-bold">Informacion</div>
            <div class="row">
              <div class="col q-mx-sm">
                <div class="text-subtitle3 text-bold text-grey-6">Disponible para</div>
                <div class="text-caption text-grey-6">{{hospedaje.pet_type}}</div>
                <div class="text-subtitle3 text-bold text-grey-6">Cantidad de pasajero</div>
                <div class="text-caption text-grey-6">{{hospedaje.guests}} mascotas</div>
                <div class="text-subtitle3 text-bold text-grey-6">Tipo de espacio</div>
                <div class="text-caption text-grey-6">{{hospedaje.location}}</div>
              </div>
              <div class="col q-mx-sm">
                <div class="text-subtitle3 text-bold text-grey-6">Tamaños que recibe</div>
                <div class="text-caption text-grey-6">{{hospedaje.petSize}}</div>
              </div>
            </div>
          </div>
          <div class="q-mb-lg row items-center">
            <div class="col column items-center">
              <q-avatar rounded class="bg-orange-2 text-black q-mb-xs" icon="directions_car" size="50px" style="border-radius: 10px;"/>
              <div class="text-subtitle3">Estacionamiento</div>
            </div>
            <div class="col column items-center">
              <q-avatar rounded class="bg-orange-2 text-black q-mb-xs" icon="pool" size="50px" style="border-radius: 10px;"/>
              <div class="text-subtitle3">Piscina</div>
            </div>
            <div class="col column items-center">
              <q-avatar rounded class="bg-orange-2 text-black q-mb-xs" icon="directions_walk" size="50px" style="border-radius: 10px;"/>
              <div class="text-subtitle3">Paseo</div>
            </div>
          </div>

          <div v-if="rol === 2">
            <div class="q-my-md">
              <div class="text-overline">Cuando te vas a alojar</div>
              <div class="text-caption">Selecciona tu fecha de ingreso y salida</div>
              <div class="row justify-around">
                <q-input filled readonly dense v-model="form.fecha_ingreso" class="col-5" placeholder="dd/mm/aaaa" hint="Fecha de ingreso" @click="$refs.qDateProxy1.show()"
                error-message="Este campo es requerido" :error="$v.form.fecha_ingreso.$error" @blur="$v.form.fecha_ingreso.$touch()">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy1" transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha_ingreso" mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input filled readonly dense v-model="form.fecha_salida" class="col-5" placeholder="dd/mm/aaaa" hint="Fecha de salida" @click="$refs.qDateProxy2.show()"
                error-message="Este campo es requerido" :error="$v.form.fecha_salida.$error" @blur="$v.form.fecha_salida.$touch()">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha_salida" mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="q-my-md">
              <div class="text-overline">Selecciona tu(s) mascota(s)</div>
              <div class="text-caption">Recuerda que solo podras agregar mascotas que cumplan los requisitos</div>
              <q-select dense filled v-model="form.mascotas" :options="mascotas" option-label="name" map-options
              error-message="Este campo es requerido" :error="$v.form.mascotas.$error" @blur="$v.form.mascotas.$touch()">
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey text-italic">No hay mascotas</q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
        </div>
      </div>

      <div class="row items-center q-pa-md">
        <q-btn class="col q-pa-sm" color="primary" :label="rol === 4 ? 'Editar alojamiento' : 'Reservar'" @click="rol === 4 ? $router.push('/editar_espacio/' + hospedaje._id) : reservar()" style="border-top-left-radius: 15px; border-bottom-left-radius: 15px; border-top-right-radius: 0px; border-bottom-right-radius: 0px;" no-caps/>
        <q-btn class="col2 q-pa-sm text-black" color="orange-2" style="border-top-left-radius: 0px; border-bottom-left-radius: 0px; border-top-right-radius: 15px; border-bottom-right-radius: 15px;" no-caps>${{hospedaje.price}} por dia</q-btn>
      </div>

      <q-dialog v-model="reserva" maximized persistent>
        <q-card style="width:100%;">
          <q-toolbar class="bg-primary row items-center" style="width:100%; height:60px">
            <div class="col-1">
              <q-btn flat round color="white" icon="arrow_back" @click="reserva = false"/>
            </div>
            <div class="col-10 text-white text-subtitle1 text-center">Pagar</div>
          </q-toolbar>

          <div class="column items-center">
            <div class="q-ma-lg">
              <q-avatar rounded style="height: 150px; width: 250px;" class="bg-secondary q-mb-sm">
                <q-img style="height: 100%;" :src="hospedaje.images ? baseu + hospedaje.images[0].src : ''"/>
              </q-avatar>
            </div>
            <q-card class="q-mb-md shadow-6" style="width: 90%; height: auto;">
              <q-card-section>
                <div class="text-grey-8">Nombre del titular</div>
                <q-input dense v-model="form.name" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
              </q-card-section>
              <q-card-section>
                <div class="text-grey-8">Numero de tarjeta</div>
                <q-input dense type="number" v-model.number="form.card" error-message="Este campo es requerido" :error="$v.form.card.$error" @blur="$v.form.card.$touch()"/>
              </q-card-section>
              <q-card-section horizontal style="height: 100%;">
                <q-card-section class="col">
                  <div class="text-grey-8">Fecha de expiración</div>
                  <q-input readonly dense v-model="form.expiration" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy3.show()"
                  error-message="Este campo es requerido" :error="$v.form.expiration.$error" @blur="$v.form.expiration.$touch()">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy3" transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.expiration" mask="DD/MM/YYYY">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Cerrar" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>
                <q-card-section class="col">
                  <div class="text-grey-8">CVV</div>
                  <q-input dense type="number" v-model="form.cvv" error-message="Este campo es requerido" :error="$v.form.cvv.$error" @blur="$v.form.cvv.$touch()"/>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="q-mb-lg shadow-6" style="width: 90%; height: auto;">
              <q-card-section horizontal class="justify-between q-pb-lg">
                <q-card-section>
                  <div class="text-grey-8">Precio alojamiento</div>
                </q-card-section>
                <q-card-section>
                  <div>${{hospedaje.price}}</div>
                </q-card-section>
              </q-card-section>
              <q-separator />
              <q-card-section horizontal class="justify-between">
                <q-card-section>
                  <div class="text-pink-13">Total a pagar</div>
                </q-card-section>
                <q-card-section>
                  <div class="text-pink-13">${{totalPrice(hospedaje.price)}}</div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-btn class="q-mb-lg q-pa-sm" color="primary" label="Pagar" @click="pagar()" style="width: 60%; border-radius: 4px" no-caps/>
          </div>
        </q-card>
      </q-dialog>
  </q-layout>
</template>

<script>
import env from '../../env'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  data () {
    return {
      reserva: false,
      fechaValida: false,
      slide: 0,
      rol: 0,
      user: {},
      id: '',
      baseu: '',
      hospedaje: {},
      form: {},
      mascotas: []
    }
  },
  validations: {
    form: {
      fecha_ingreso: { required },
      fecha_salida: { required },
      mascotas: { required },
      name: { required },
      card: { required },
      expiration: { required },
      cvv: { required }
    }
  },
  mounted () {
    this.getHospedaje()
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.rol = res.roles[0]
          this.user = res
        }
      })
    },
    getHospedaje () {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        this.$api.get('hospedaje/' + this.id).then(res => {
          if (res) {
            this.hospedaje = res
            this.baseu = env.apiUrl + 'hospedajes_img/'
            console.log('hospedaje', this.hospedaje)
          }
        })
      }
    },
    totalPrice (val) {
      var total = 0
      var dias = 0
      if (this.fechaValida) {
        dias = moment(this.form.fecha_salida).diff(this.form.fecha_ingreso, 'days') + 1
      } else {}
      if (dias > 0) {
        total = val * dias
      }
      return total
    },
    reservar () {
      this.$v.form.fecha_ingreso.$touch()
      this.$v.form.fecha_salida.$touch()
      if (!this.$v.form.fecha_ingreso.$error && !this.$v.form.fecha_salida.$error) {
        if (this.form.fecha_ingreso <= this.form.fecha_salida) {
          this.fechaValida = true
          this.reserva = true
        } else {
          this.fechaValida = false
          this.$q.dialog({
            title: 'Atención',
            message: 'El orden de las fechas no coinciden',
            cancel: false,
            persistent: true
          }).onOk(() => {
            // Ok
          }).onCancel(() => {
            // cancel
          })
        }
      }
    },
    pagar () {
      this.$v.form.name.$touch()
      this.$v.form.card.$touch()
      this.$v.form.expiration.$touch()
      this.$v.form.cvv.$touch()
      if (!this.$v.form.name.$error && !this.$v.form.card.$error && !this.$v.form.expiration.$error && !this.$v.form.cvv.$error) {
        this.reserva = false
      }
    }
  }
}
</script>
