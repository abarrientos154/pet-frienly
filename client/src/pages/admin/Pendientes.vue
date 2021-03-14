<template>
  <div>
    <q-card class="row q-mx-sm q-my-md justify-between bg-secondary" style="min-width: 300px">
        <div class="text-h6 q-mx-sm">Proveedores pendientes</div>
    </q-card>
    <q-list class="row justify-center" v-if="data.length > 0">
      <q-card class="q-mx-sm q-mb-md bg-secondary col no-wrap" v-for="(item, index) in data" :key="index" v-ripple style="border-radius: 15px; max-width: 400px; min-width: 300px">
        <div class="row justify-between">
          <div class="col-4" @click="$router.push('/descripcionusuario/'+item._id)" style="width: 100px; height: 110px; border-radius: 15px">
            <q-img :src="baseu + item._id" style="width: 100px; height: 110px; border-radius: 15px"/>
          </div>
          <div class="col-6 q-py-sm justify-center column" @click="$router.push('/descripcionusuario/'+item._id)">
            <q-scroll-area class="q-ml-sm" horizontal style="height: 20px; width:100%">
              <div class="text-subtitle2 text-weight-bolder">{{item.name}}</div>
            </q-scroll-area>
            <div class="q-ml-sm">{{item.email}}</div>
            <q-chip text-color="white" label="Aprobar usuario" color="primary" />
          </div>
          <div class="col-2 column justify-around">
            <q-btn flat dense round class="q-mx-sm" color="green-14" icon="done_outline" @click="aprobarProv(item._id)" />
            <q-btn flat dense round class="q-mx-sm" color="red" icon="dangerous" @click="rechazarProv(item._id)" />
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-sm q-pa-md bg-secondary">
      <div class="text-center text-subtitle1">Actualmente sin proveedores pendientes...</div>
    </q-card>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      baseu: '',
      data: []
    }
  },
  mounted () {
    this.getProveedores()
    this.baseu = env.apiUrl + 'perfil_img/'
  },
  methods: {
    getProveedores () {
      this.$api.post('user_by_status', { rol: [3] }).then(res => {
        if (res) {
          this.data = res
        }
      })
    },
    aprobarProv (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas aprobar este proveedor?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_status/' + id, { estatus: 1 }).then(res => {
          if (res) {
            this.getProveedores()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    },
    rechazarProv (id) {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas rechazar este proveedor?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_status/' + id, { estatus: 2 }).then(res => {
          if (res) {
            this.getProveedores()
          }
        })
      }).onCancel(() => {
        // cancel
      })
    }
  }
}
</script>
