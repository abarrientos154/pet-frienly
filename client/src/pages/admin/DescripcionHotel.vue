<template>
  <div class="row justify-center">
    <div class="col" style="max-width: 500px">
      <q-img class="shadow-15" :src="baseu + perfile" spinner-color="white" style="height: auto; width: 100%; border-bottom-left-radius: 30px; border-bottom-right-radius: 30px;">
        <q-card class="row justify-center" style="width: 100%;">
          <q-icon class="col-1" name="person" color="Black" style="font-size: 1.5rem;"/>
          <div class="q-pl-xs q-pt-xs text-weight-bolder text-h6">{{data.name}}</div>
        </q-card>
      </q-img>

      <q-scroll-area v-if="rol === 3" horizontal style="height: 110px;" class="q-ma-sm">
        <div class="row no-wrap" style="width: 100%">
          <q-card v-for="(img, index) in data.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
            <q-img :src="baseuTienda + img" spinner-color="white" style="height: 100px; width: 100px" />
          </q-card>
        </div>
      </q-scroll-area>

      <q-card class="q-pa-xs q-mt-sm shadow-up-10 bg-secondary" style="border-radius:25px">
        <div class="row" style="width:100%">
          <q-icon class="col-1" name="email" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.email}}</div>
        </div>
        <div class="row" style="width:100%">
          <q-icon class="col-1" name="room" color="blak" style="font-size: 1.5rem;"/>
          <q-scroll-area class="col" horizontal style="height: 25px; width:100%">
            <div class="q-pl-xs q-pt-xs text-subtitle2">{{data.place}}</div>
          </q-scroll-area>
        </div>
        <div class="row" style="width:100%">
          <q-icon class="col-1" name="payment" color="blak" style="font-size: 1.5rem;"/>
          <div class="q-pl-xs q-pt-xs text-subtitle2">DNI: {{data.dni}}</div>
        </div>
      </q-card>

      <q-card v-if="data.roles" class="bordes q-pa-xs q-mt-md shadow-up-10 bg-white" style="height: 400px; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
        <div class="q-mx-md text-h6 text-center">{{rol === 3 ? 'Solicitud Hoteleria' : ''}}</div>
        <div v-if="data.hoteleria" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="q-pl-lg text-black text-caption"> País</div>
            <q-input disable class="q-mt-sm" v-model="data.hoteleria.paisName" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
        <div class="q-pl-lg text-black text-caption"> ¿Donde daras Alojamiento?</div>
            <q-input disable class="q-mt-sm" v-model="data.hoteleria.ciudadName" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> Donde esta ubicado</div>
            <q-input disable autogrow class="q-mt-sm" v-model="data.hoteleria.ubicacion" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> ¿Esta pensado especialmente para tus hospedadores?</div>
            <q-input disable class="q-mt-sm" v-model="data.hoteleria.pensado" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> Presto servicios por parte de</div>
            <q-input disable class="q-mt-sm" v-model="data.hoteleria.presto" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> Cantidad de huespedes</div>
            <q-input disable class="q-mt-sm" v-model="data.hoteleria.huespedes" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
              <div class="q-pl-lg q-mt-sm text-black text-caption"> Direccion</div>
              <q-input disable class="q-mt-sm" v-model="data.hoteleria.alojamiento.direccion" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Apartamento o numero</div>
              <q-input disable class="q-mt-sm" v-model="data.hoteleria.alojamiento.apartamento" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Ciudad</div>
              <q-input disable class="q-mt-sm" v-model="data.hoteleria.alojamiento.ciudad" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Estado</div>
              <q-input disable class="q-mt-sm" v-model="data.hoteleria.alojamiento.estado" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Codigo postal</div>
              <q-input disable class="q-mt-sm" v-model="data.hoteleria.alojamiento.codigo" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Servicios que ofrece</div>
              <div class="q-ml-sm" v-for="(item, index) in data.hoteleria.ofrece" :key="index">
              <div class="q-ml-md">
              {{item}}
              </div>
              </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import env from '../../env'
export default {
  data () {
    return {
      id: this.$route.params.id,
      baseu: '',
      baseuTienda: '',
      perfile: '',
      rol: null,
      today: null,
      now: null,
      data: {},
      misDatos: [],
      img: '',
      estado: false,
      dialogStado: false,
      ratingPerfil: 0
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    verImg (img) {
      this.baseu = env.apiUrl + '/tienda_img/'
      this.perfile = img
    },
    getInfo () {
      this.$api.get('user_by_id/' + this.id).then(v => {
        this.data = v
        console.log(this.data, 'datos hospedaje')
        this.rol = v.roles[0]
        this.perfile = this.id
        this.baseu = env.apiUrl + '/perfil_img/'
        this.baseuTienda = env.apiUrl + '/tienda_img/'
        if (this.rol === 3) {
          this.getProduct()
        } else {
        }
      })
    },
    getProduct () {
      this.$api.get('producto_by_proveedor/' + this.id).then(v => {
        if (v) {
          this.misDatos = v
        }
      })
    }
  }
}
</script>find
