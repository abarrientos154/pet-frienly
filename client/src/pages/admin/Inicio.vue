<template>
  <div>
   <div class="q-mt-lg text-center q-pa-md text-weight-bolder bg-secondary text-black q-ma-md" style="border-radius:12px">BIENVENIDO ADMINISTRADOR</div>
   <div class="row estilo-titulos q-mt-lg q-ml-sm q-mb-sm q-pl-sm">
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <q-icon class="q-mt-xs" name="stop_circle" style="font-size: 0.6em"/>
      <div class="text-bold q-ml-sm">MIS ACCIONES</div>
    </div>

    <div class="q-pa-md">
      <q-card v-ripple class="q-pa-sm q-my-md bordes" @click="$router.push('/proveedores')" >
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="store" class="text-black" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-black text-weight-bolder text-h6">Proveedores</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>

      <q-card v-ripple class="q-pa-sm q-my-md bordes" @click="$router.push('/clientes')" >
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="person" class="text-black" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-black text-weight-bolder text-h6">Clientes</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>

      <q-card v-ripple class="q-pa-sm q-my-md bordes" @click="$router.push('/proveedores_pendientes')" >
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="lock_clock" class="text-black" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-black text-weight-bolder text-h6">Pendientes</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>

      <q-card v-ripple class="q-pa-sm q-my-md bordes" @click="$router.push('/reportes_usuarios')" >
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="view_list" class="text-black" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-black text-weight-bolder text-h6">Reportes</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
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
</style>>
