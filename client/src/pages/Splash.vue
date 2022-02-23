<template>
  <q-card class="absolute-full no-shadow">
    <div class="row q-pa-xl absolute-center">
      <img class="col-12" src="logo1.svg" width="300px" height="300px">
      <div class="text-h3 text-center col-12">CANGURU</div>
    </div>
    <div class="text-uppercase bajo text-center text-bold">
      Bienestar a 4 patas
    </div>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      time: ''
    }
  },
  methods: {
    start () {
      this.$router.push('/inicio')
      console.log('start')
    }
  },
  created () {
    this.timer = setInterval(this.start, 3000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>

.bajo {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 20px;
}

</style>
