<template>
  <div>
    <div class="text-h6 text-center text-grey-9" >¿Eres Un?</div>
    <q-list>
      <q-card
        v-ripple
        style="border-radius:10px;width:100%"
        class="q-pa-sm q-mt-md q-mb-md shadow-11"
        v-for="(item, index) in options_roles"
        :key="index"
        @click="onSubmit(item.value)" >
        <q-item>
          <q-item-section avatar>
            <q-avatar :icon="item.icon" class="text-primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-primary text-h6">{{item.label}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="arrow_right" color="primary" />
          </q-item-section>
        </q-item>
      </q-card>
    </q-list>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      options_roles: [
        { label: 'Proveedor', value: 3, icon: 'store' },
        { label: 'Cliente', value: 2, icon: 'person' }
      ]
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async onSubmit (rol) {
      this.$q.loading.show()
      this.form.roles = rol
      this.panel.panel = 'parte_dos'
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>>
