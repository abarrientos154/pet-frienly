<template>
  <div>
    <GmapMap :center="center" :zoom="10" map-type-id="terrain" style="width: 100%; height: 300px" class="q-mt-sm" >
      <GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"/>
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: ['descripcion', 'center', 'markers', 'id'],
  data () {
    return {
      // center: { lat: 10.201337655073424, lng: -68.00833723294686 },
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style>

</style>>
