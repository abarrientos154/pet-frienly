<template>
  <div>
    <div class="row justify-around q-ma-sm">
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[0]" text-color="black" label="Semanal" @click="filter('semanal')" />
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[1]" text-color="black" label="Mensual" @click="filter('mensual')" />
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[2]" text-color="black" label="Semestral" @click="filter('semestral')" />
        <q-btn no-caps class="shadow-11 col-5 q-mb-sm" :color="btn[3]" text-color="black" label="Anual" @click="filter('anual')" />
    </div>
    <q-separator inset />
    <div class="row justify-center">
        <div class="text-h6 q-ma-md text-center estilo-titulos">Mis Reportes</div>
    </div>

    <div v-if="data.length > 0" class="q-pa-md q-gutter-md">
        <q-card @click="$router.push('/descripcionusuario/'+user._id)" class="bordes row q-pl-md q-py-md q-pr-xs" v-for="(user, index) in data" :key="index">
            <div class="col-4">
                <q-img :src=" baseu + user._id" style="height:80px; width:100px" />
            </div>
            <div class="col-7">
              <div class="text-black text-bold text-subtitle1 q-pl-sm">{{user.last_name ? user.full_name + ' ' + user.last_name : user.full_name}}</div>
              <div class="row" style="width:100%">
                <q-icon class="col-1" name="room" color="blak" style="font-size: 1rem;"/>
                <div class="q-pl-xs q-pt-xs text-caption">{{user.country + ', ' + user.direccion}}</div>
              </div>
              <div class="row" style="width:100%">
                <q-icon class="col-1" name="email" color="blak" style="font-size: 1rem;"/>
                <div class="q-pl-xs q-pt-xs text-caption">{{user.email}}</div>
              </div>
            </div>
        </q-card>
    </div>

    <q-card v-else class="shadow-2 q-ma-md q-pa-md">
      <div class="text-center text-subtitle1">Actualmente sin nada que reportar...</div>
    </q-card>
  </div>
</template>

<script>
import env from '../../env'
import moment from 'moment'
export default {
  data () {
    return {
      baseu: '',
      btn: ['white', 'white', 'white', 'white'],
      today: null,
      allData: [],
      data: []
    }
  },
  mounted () {
    this.getData()
    this.baseu = env.apiUrl + '/perfil_img/perfil'
  },
  methods: {
    getData () {
      this.$api.get('all_user').then(res => {
        if (res) {
          this.allData = res
          this.data = this.allData
        }
      })
    },
    filter (val) {
      if (val === 'semanal') {
        this.btn = ['primary', 'white', 'white', 'white']
        this.data = this.allData.filter(v => moment(v.created_at).year() === moment().year() && moment(v.created_at).week() === moment().week())
      } else if (val === 'mensual') {
        this.btn = ['white', 'primary', 'white', 'white']
        this.data = this.allData.filter(v => moment(v.created_at).year() === moment().year() && moment(v.created_at).month() === moment().month())
      } else if (val === 'anual') {
        this.btn = ['white', 'white', 'white', 'primary']
        this.data = this.allData.filter(v => moment(v.created_at).year() === moment().year())
      } else if (val === 'semestral') {
        this.btn = ['white', 'white', 'primary', 'white']
        var monthToday = moment().subtract(6, 'month')
        this.data = this.allData.filter(v => moment(v.created_at) >= monthToday)
      }
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
