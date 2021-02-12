<template>
  <div>
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Proveedores</div>
    </div>
    <q-list class="q-mx-sm q-my-md q-gutter-sm" v-if="data.length > 0">
      <q-card class="q-pa-md bordes" v-for="(item, index) in data" :key="index" v-ripple>
        <div class="row justify-between">
          <div class="col-4" @click="$router.push('/descripcionusuario/'+item._id)">
            <q-img :src="baseu + item._id" style="width:100px; height: 80px;" />
          </div>
          <div class="col-6" @click="$router.push('/descripcionusuario/'+item._id)">
              <q-scroll-area
                horizontal
                style="height: 33px; width:100%"
              >
                <div class="text-subtitle2 text-weight-bolder">{{item.full_name}}</div>
              </q-scroll-area>
              <div class="text-caption q-pl-sm">{{item.country}}</div>
              <q-chip text-color="white" :label="item.enable ? 'Habilitado' : 'Desabilitado'" :color="item.enable ? 'green-14' : 'red'" />
          </div>
          <div class="col-2 column justify-center">
            <q-toggle
                @input="disableEnable(item._id, item.enable)"
                v-model="item.enable"
                checked-icon="lock_open"
                unchecked-icon="lock"
                :color="item.enable ? 'green-14' : 'red'"
                keep-color
                />
          </div>
        </div>
      </q-card>
    </q-list>
    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
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
      data: []
    }
  },
  mounted () {
    this.getProveedores()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
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

<style scoped lang="scss">
.bordes {
  border-left: 6px solid $primary;
  background-color: rgba(202, 202, 202, 0.474);
  border-radius: 12px;
}
.estilo-titulos {
  background-color: #fff599;
  width: 250px;
  border-radius: 12px
}
</style>
