<template>
  <div>
  <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >

      <q-carousel-slide v-for="(item, index) in options_roles" :key="index" :name="index+1" :img-src="item.image">
       <q-carousel-control
          position="bottom-left"
          :offset="[110, 60]"
        >
          <q-btn color="grey" text-color="black" @click="onSubmit(item.value)" :label="item.label" style="width:110px"/>
        </q-carousel-control>
      </q-carousel-slide>
       <template v-slot:control>

      </template>
    </q-carousel>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['form', 'panel'],
  data () {
    return {
      options_roles: [
        { label: 'Proveedor', value: 3, icon: 'store', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
        { label: 'Cliente', value: 2, icon: 'person', image: 'https://cdn.quasar.dev/img/quasar.jpg' }
      ],
      slide: 1
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async onSubmit (rol) {
      this.$q.loading.show()
      this.form.roles = rol
      if (this.form.roles === 2) {
        this.panel.panel = 'parte_tres_cliente_datos'
      } else if (this.form.roles === 3) {
        this.panel.panel = 'parte_tres_proveedor_datos'
      }
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>>
