<template>
  <div>
    <div class="absolute-center full-width column justify-between">
      <div class="q-pb-xl">
        <div class="row justify-center q-pb-lg">
          <img src="logo.png" style="width:260px" />
        </div>
        <div class="text-h5 text-bold text-center text-grey-9">¿Te gustaria agregar un producto?</div>
        <div class="text-caption text-center">Agrega el primer producto que quieres ofrecer</div>
      </div>

      <div class="q-pt-xl column items-center q-gutter-sm">
        <q-btn no-caps rounded class="q-py-xs" color="primary" label="Agregar producto" style="width: 60%"
          to="/registro_producto"/>
        <q-btn no-caps flat color="primary" label="Omitir para ir a tienda" style="width: 60%"
          to="/inicio_proveedor"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      slide: 1
    }
  },
  methods: {
  }
}
</script>
