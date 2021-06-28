<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary row justify-between items-center full-width" style="height: 60px">
      <q-btn round flat stack dense no-caps class="absolute-left" icon="arrow_back" color="white" size="md" @click="$router.go(-1)"/>
      <div class="col text-white text-h6 text-center">Pagar</div>
    </q-header>
    <q-page-container>
      <div class="column items-center">
        <div class="q-ma-lg">
          <q-avatar rounded style="height: 150px; width: 250px;" class="bg-secondary q-mb-sm">
            <q-img style="height: 100%;" :src="baseu + hospedaje.images[0].src"/>
          </q-avatar>
        </div>
        <q-card class="q-mb-md shadow-6" style="width: 90%; height: auto;">
          <q-card-section>
            <div class="text-grey">Nombre del titular</div>
            <q-input dense v-model="form.name" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
          </q-card-section>
          <q-card-section>
            <div class="text-grey">Numero de tarjeta</div>
            <q-input dense type="number" v-model.number="form.card" error-message="Este campo es requerido" :error="$v.form.card.$error" @blur="$v.form.card.$touch()"/>
          </q-card-section>
          <q-card-section horizontal style="height: 100%;">
            <q-card-section class="col">
              <div class="text-grey">Fecha de expiración</div>
              <q-input dense type="date" v-model="form.expiration" error-message="Este campo es requerido" :error="$v.form.expiration.$error" @blur="$v.form.expiration.$touch()"/>
            </q-card-section>
            <q-card-section class="col">
              <div class="text-grey">CVV</div>
              <q-input dense type="number" v-model="form.cvv" error-message="Este campo es requerido" :error="$v.form.cvv.$error" @blur="$v.form.cvv.$touch()"/>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="q-mb-lg shadow-6" style="width: 90%; height: auto;">
          <q-card-section horizontal class="justify-between">
            <q-card-section>
              <div class="text-grey">Precio alojamiento</div>
            </q-card-section>
            <q-card-section>
              <div>${{hospedaje.price}}</div>
            </q-card-section>
          </q-card-section>
          <q-card-section>
            <q-input dense type="number" v-model.number="totalPagar" error-message="Debe ingresar el monto exacto" :error="$v.totalPagar.$error" @blur="$v.totalPagar.$touch()"/>
          </q-card-section>
          <q-card-section horizontal class="justify-between">
            <q-card-section>
              <div :class="totalPagar != total ? 'text-red' : ''">Total a pagar</div>
            </q-card-section>
            <q-card-section>
              <div :class="totalPagar != total ? 'text-red' : ''">${{total}}</div>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-btn class="q-mb-lg q-pa-sm" color="primary" label="Pagar" @click="pagar()" style="width: 60%; border-radius: 4px" no-caps/>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators'
import env from '../../env'
export default {
  data () {
    return {
      user: {},
      id: '',
      hospedaje: {},
      porcentaje: 0,
      total: 0,
      totalPagar: null,
      baseu: '',
      form: {}
    }
  },
  validations: {
    form: {
      name: { required },
      card: { required },
      expiration: { required },
      cvv: { required }
    },
    total: { required },
    totalPagar: { sameAs: sameAs('total') }
  },
  mounted () {
    this.getHospedaje()
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
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
            this.porcentaje = (this.hospedaje.price * 2) / 100
            this.total = this.hospedaje.price + this.porcentaje
            this.baseu = env.apiUrl + 'hospedajes_img/'
            console.log(this.hospedaje)
          }
        })
      }
    },
    pagar () {
      this.$v.$touch()
      if (!this.$v.form.$error && !this.$v.totalPagar.$error) {
        console.log('sin fallo')
        this.form.pago = this.totalPagar
        this.$q.loading.show({
          message: 'Procesando pago...'
        })
        this.$q.notify({
          message: 'Pago realizado con exito',
          color: 'positive'
        })
        this.$q.loading.hide()
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    }
  }
}
</script>
