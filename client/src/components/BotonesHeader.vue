<template>
  <div class="row justify-around">
    <q-btn v-for="(item, index) in categorias" push color="white" text-color="black" round :icon="item.icons" class="q-mt-sm q-mr-sm q-ml-sm" :to="'/filtrar_categorias/' + item._id" :key="index"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categorias: [
      ]
    }
  },
  mounted () {
    this.obtenerDatos()
  },
  methods: {
    obtenerDatos () {
      this.$api.get('categoria').then(res => {
        if (res) {
          this.categorias = res
        }
      })
    }
  }

}
</script>

<style>

</style>>
