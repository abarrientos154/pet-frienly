<template>
  <div>
    <q-card class="row q-mx-sm q-my-md justify-between bg-secondary">
        <div class="text-h6 q-mx-sm">Proveedores</div>
        <q-btn flat @click="$router.push('/proveedores_pendientes')" round dense icon="history" size="15px" color="black">
          <q-badge v-if="pendientes.length > 0" color="red" :label="pendientes.length" floating/>
        </q-btn>
    </q-card>
    <q-list class="row justify-center" v-if="data.length > 0">
      <q-card class="q-mx-sm q-mb-md bg-secondary col no-wrap" v-for="(item, index) in data" :key="index" v-ripple style="border-radius: 15px; max-width: 400px; min-width: 300px;">
        <div class="row justify-between">
          <div class="col-4" @click="$router.push('/descripcionusuario/'+item._id)" style="width: 100px; height: 110px; border-radius: 15px">
            <q-img :src="baseu + item._id" style="width: 100px; height: 110px; border-radius: 15px"/>
          </div>
          <div class="col-6 q-py-sm justify-center column" @click="$router.push('/descripcionusuario/'+item._id)">
            <q-scroll-area class="q-ml-sm" horizontal style="height: 20px; width:100%">
              <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
            </q-scroll-area>
            <div class="q-ml-sm">{{item.email}}</div>
            <q-chip text-color="white" :label="item.enable ? 'Habilitado' : 'Desabilitado'" :color="item.enable ? 'green-14' : 'red'"/>
          </div>
          <div class="col-2 column justify-center">
            <q-toggle @input="disableEnable(item._id, item.enable)" v-model="item.enable" checked-icon="lock_open" unchecked-icon="lock" :color="item.enable ? 'green-14' : 'red'" keep-color/>
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-sm q-pa-md bg-secondary">
      <div class="text-center text-subtitle1">Actualmente sin proveedores...</div>
    </q-card>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      data: [],
      pendientes: []
    }
  },
  mounted () {
    this.getProvPendientes()
    this.getProveedores()
    this.baseu = env.apiUrl + 'perfil_img/'
    console.log(this.baseu)
  },
  methods: {
    getProvPendientes () {
      this.$api.post('user_by_status', { rol: [3] }).then(res => {
        if (res) {
          this.pendientes = res
        }
      })
    },
    getProveedores () {
      this.$api.post('user_by_rol', { rol: [3] }).then(res => {
        if (res) {
          this.data = res
        }
      })
    },
    disableEnable (id, enable) {
      var message = ''
      if (enable) {
        message = 'desbloquear'
      } else {
        message = 'bloquear'
      }
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas ' + message + ' este proveedor?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.post('user_enable/' + id, { enable: enable }).then(res => {
          if (res) {
            this.getProveedores()
          }
        })
      }).onCancel(() => {
        this.getProveedores()
      })
    }
  }
}
</script>
