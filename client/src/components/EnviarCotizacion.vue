<template>
  <q-card class="q-ma-sm">
    <q-card-section>
      <div class="row justify-end">
        <q-btn icon="close" @click="accion === 'presupuesto' ? deleteChat() : ''" v-close-popup flat dense/>
      </div>
      <div class="text-primary text-center text-h5">{{accion === 'cotizar' ? '* Cotización *' : '* Presupuesto *'}}</div>
      <div class="text-caption text-grey-7 q-mt-lg">Ingresa el servicio que deseas brindar y el precio correspondiente.</div>
      <div class="row q-mt-sm justify-around">
        <q-input bottom-slots class="col-12" v-model="add.servicio" placeholder="Servicio" dense outlined rounded error-message="Requerido" :error="$v.add.servicio.$error" @blur="$v.add.servicio.$touch()">
          <template v-slot:before>
            <q-icon name="settings" />
          </template>
        </q-input>
        <q-input bottom-slots class="col-12" v-model.number="add.precio" placeholder="Precio" type="number" dense outlined rounded error-message="Requerido" :error="$v.add.precio.$error" @blur="$v.add.precio.$touch()" >
          <template v-slot:before>
            <q-icon name="monetization_on" />
          </template>
        </q-input>
      </div>
      <div class="row justify-end q-mt-xs">
        <q-btn label="agregar" dense style="padding:1px; border-radius:12px;width:150px" color="primary" push glossy @click="addCarrito(add)"/>
      </div>
      <q-separator inset class="q-mt-md" />
      <div class="column q-mt-sm">
          <div class="column">
            <div class="row items-center">
              <div class="text-subtitle2 text-grey-9 q-ml-sm"> * Servicios *</div>
            </div>
            <div v-if="!carrito.length" class="col-6 title-table q-pa-xs">Debes añadir un servicio</div>
            <div v-else class="row justify-center">
              <div class="col-6 title-table q-pa-xs">Servicio</div>
              <div class="col-5 title-table q-pa-xs">Precio</div>
              <q-btn class="col-1" icon="" flat dense/>
            </div>
            <div class="row justify-center q-mt-sm" v-for="(item, index) in carrito" :key="index">
              <div class="col-6 title-table-product q-pa-xs">{{item.servicio}}</div>
              <div class="col-5 title-table-product q-pa-xs">{{item.precio}}</div>
              <q-btn class="col-1" icon="delete" color="red" flat dense @click="deleteServicio(index)"/>
            </div>
          </div>
      </div>
      <q-separator inset class="q-mt-md" />
      <div class="row justify-around q-mt-md">
        <div class="text-h6 text-primary">Total</div>
        <div class="column">
          <div class="text-h6 text-primary">$ {{totalCarrito}}</div>
        </div>
      </div>
      <div class="row justify-center q-mt-md">
        <q-btn label="enviar" color="primary" push glossy style="width:150px;height:45px" @click="accion === 'cotizar' ? enviarCotizacion() : enviarPresupuesto()" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: ['ruta', 'accion'],
  data () {
    return {
      add: {},
      carrito: [],
      cotizacion: {},
      totalCot: 0
    }
  },
  validations () {
    return {
      add: {
        servicio: { required },
        precio: { required }
      }
    }
  },
  computed: {
    totalCarrito () {
      let total = 0
      if (this.carrito.length > 0) {
        for (const i of this.carrito) {
          total = total + i.precio
        }
      }
      return total
    }
  },
  mounted () {
    this.getCotizacion()
  },
  methods: {
    getCotizacion () {
      this.$api.get('cotization_by_id/' + this.ruta).then(v => {
        if (v) {
          this.carrito = v.cotizacion.servicios
        }
      })
    },
    addCarrito (miObjeto) {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.carrito.push(this.add)
        this.add = {}
        this.$v.$reset()
      }
    },
    deleteServicio (index) {
      this.carrito.splice(index, 1)
    },
    deleteChat () {
      this.$api.delete('chat/' + this.ruta).then(res => {
        if (res) {
          this.$router.go(-1)
        }
      })
    },
    async enviarCotizacion () {
      if (this.carrito.length > 0) {
        this.$q.loading.show({
          message: 'Enviando cotización, Por Favor Espere...'
        })
        this.cotizacion.servicios = this.carrito
        this.cotizacion.total = this.totalCarrito
        this.cotizacion.status = 'Cotizado'
        await this.$api.put('cotizar_necesidad/' + this.ruta, this.cotizacion).then((res) => {
          this.$q.loading.hide()
          this.$router.push('/mis_cotizaciones')
        })
      } else {
        this.$q.notify({
          message: 'Ingrese sus servicios antes de enviar una cotización',
          color: 'black'
        })
      }
    },
    async enviarPresupuesto () {
      if (this.carrito.length > 0) {
        this.$q.loading.show({
          message: 'Enviando presupuesto, Por Favor Espere...'
        })
        this.cotizacion.servicios = this.carrito
        this.cotizacion.total = this.totalCarrito
        this.cotizacion.status = 'Presupuesto'
        await this.$api.put('cotizar_necesidad/' + this.ruta, this.cotizacion).then((res) => {
          this.$q.loading.hide()
          this.$emit('presupuesto', false)
        })
      } else {
        this.$q.notify({
          message: 'Ingrese sus servicios antes de enviar un presupuesto',
          color: 'black'
        })
      }
    }
  }
}
</script>

<style>
.round-tag {
  border-radius: 12px;
}
.title-table {
  border-radius: 12px;
  background-color: #b3e3f4;
  color: #529cb3;
  border: 1px solid grey;
}

.title-table-product {
  border-radius: 12px;
  background-color: #888585;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
}
</style>
