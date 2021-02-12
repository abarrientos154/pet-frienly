<template>
  <div class="row justify-center">
    <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white row justify-between">
        <q-btn round dense flat icon="keyboard_backspace" color="primary" @click="$router.go(-1)"/>
        <q-img src="logo-210x47.png" style="width:140px" />
        <q-btn flat round dense icon="person" color="primary" @click="$router.push('/Datos')"  />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div v-if="cotizarBtn" class="row justify-end full-width q-pa-sm">
        <q-btn no-caps class="shadow-11" color="primary" text-color="black" label="Cotizar" @click="cotizar = true" />
      </div>
      <div v-if="verCotizacion" class="row justify-end full-width q-pa-sm">
        <q-btn no-caps class="shadow-11" color="primary" text-color="black" :label="data.status === 'Cotizado' ? 'Ver Cotización' : 'Ver Presupuesto'" @click="$router.push('/cotizacion/' + data.id_cotization + '/presupuesto')" />
      </div>
      <q-separator v-if="cotizarBtn || verCotizacion" />

      <q-dialog persistent v-model="cotizar" transition-show="slide-up" transition-hide="slide-down" >
        <enviar-cotizacion :ruta="id" accion="cotizar" />
      </q-dialog>

      <q-dialog persistent v-model="presupuesto" transition-show="slide-up" transition-hide="slide-down" >
        <enviar-cotizacion @presupuesto="presupuesto = false" :ruta="id" accion="presupuesto" />
      </q-dialog>

      <div class="q-pa-sm" style="width: 100%; max-width: 400px">
        <q-chat-message
          :label="date"
        />
        <q-chat-message
          v-for="mens in this.data.messages" :key="mens.id"
          :name="mens.full_name"
          :text="[mens.message]"
          :stamp="mens.stamp"
          :sent="mens.send"
          :bg-color="mens.send ? 'amber-7' : 'blue'"
          :text-color="mens.send ? 'black' : 'white'"
          size="6"
        />
        <div id="fin"></div>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-white row">
        <q-input
           @keyup.enter="sendChat()"
            v-model="text"
            placeholder="Mensaje..."
            class="q-pa-sm col-10"
            bg-color="yellow-2"
            autogrow
            outlined
            />
        <q-icon href="#fin" @click="sendChat()" size="40px" name="send" color="primary" class="col-2" />
    </q-footer>
    </q-layout>
  </div>
</template>
<script>
import moment from 'moment'
import EnviarCotizacion from '../components/EnviarCotizacion'
export default {
  components: {
    EnviarCotizacion
  },
  data () {
    return {
      id: this.$route.params.id,
      text: '',
      rol: 0,
      cotizarBtn: false,
      cotizar: false,
      verCotizacion: false,
      presupuesto: false,
      form: {},
      info: {},
      date: moment().format('DD-MMMM-YYYY'),
      data: {
        datos_proveedor: {
          full_name: 'Proveedor'
        },
        datos_cliente: {
          full_name: 'Cliente'
        }
      }
    }
  },
  mounted () {
    this.getinfo()
  },
  methods: {
    getinfo () {
      this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
          this.$api.get('show_all_messages/' + this.id).then(v => {
            if (v) {
              this.data = v
              if (this.data.status === 'Pendiente' && this.rol === 3) {
                this.cotizarBtn = true
                this.presupuesto = true
              }
              if ((this.data.status === 'Presupuesto' || this.data.status === 'Cotizado' || this.data.status === 'Rechazado') && this.rol === 3) {
                this.cotizarBtn = true
              }
              if (this.data.status === 'Rechazado' && this.rol === 3) {
                this.$q.dialog({
                  title: '¡Atención!',
                  message: 'La cotización ha sido rechazada.'
                }).onOk(() => {

                })
              }
              if ((this.data.status === 'Cotizado' || this.data.status === 'Presupuesto') && this.rol === 2) {
                this.verCotizacion = true
              }
            }
          })
        }
      })
    },
    sendChat () {
      if (this.text !== '') {
        this.$api.post('send_message/' + this.id, { message: this.text }).then(res => {
          this.text = ''
          this.$api.get('show_all_messages/' + this.id).then(v => {
            if (v) {
              this.data.messages = v.messages
            }
          })
        })
      }
    }
  }
}
</script>
