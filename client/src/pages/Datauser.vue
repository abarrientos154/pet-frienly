<template>
  <div>
    <q-separator inset />
    <div class="row justify-center">
        <div v-if="datosusuario">
            <q-card flat class="q-pa-md q-ma-md shadow-3">
                <div class="row justify-center items-center">
                    <div class="q-mt-none q-ml-sm text-h7 text-grey-9 text-bold"></div>
                     <q-avatar size="180px">
                        <img :src="baseu + form._id" >
                      </q-avatar>
                      <div class="text-h5 q-ma-sm text-center text-bold"> {{form.full_name}} {{form.last_name }} </div>
                         <q-list style="width:100%">

                            <q-item clickable v-ripple>
                              <q-item-section avatar>
                                <q-icon color="primary" name="calendar_today" />
                              </q-item-section>
                              <q-item-section>{{form.fechaNac}}</q-item-section>
                            </q-item>
                          </q-list>
                    <div class="row justify-center q-pa-sm">
                  <!--   <q-btn color="primary" label="Actualizar Datos" @click="$router.push('/Datosedit')"/> -->
                    </div>
                </div>
            </q-card>
        </div>

          <div v-if="datosproveedor">
           <q-card flat class="q-pa-md q-ma-md shadow-3">
                <div class="row justify-center items-center">
                  <div class="column items-center justify-center">
                      <q-avatar size="180px">
                        <img :src="baseu + form._id" >
                      </q-avatar>
                      <div class="text-h5 q-ma-sm text-center text-bold"> {{form.name}}</div>
                  </div>
                          <q-list style="width:100%">
                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="mail" />
                            </q-item-section>
                            <q-item-section> {{form.email}}</q-item-section>
                          </q-item>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="credit_card" />
                            </q-item-section>
                            <q-item-section> {{form.dni}}</q-item-section>
                          </q-item>
                          <div class="q-mt-sm row">
                            <q-item clickable v-ripple>
                                  <q-item-section avatar>
                                    <q-icon color="primary" name="location_city" />
                                  </q-item-section>
                                <q-item-section>{{form.paisName}}, {{form.ciudadName}}</q-item-section>
                            </q-item>
                          </div>
                          <div class="q-mt-sm row">
                            <q-item clickable v-ripple>
                                  <q-item-section avatar>
                                    <q-icon color="primary" name="room" />
                                  </q-item-section>
                                <q-item-section>{{form.place}}</q-item-section>
                            </q-item>
                          </div>

                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-icon color="primary" name="design_services" />
                            </q-item-section>
                              <div class="row">
                                <div v-for="(item,index) in form.formatSer" :key="index" class="q-ml-sm">
                                  {{item.name}}
                                </div>
                              </div>
                          </q-item>

        <div v-if="Object.entries(form.hoteleria).length > 0" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div class="q-pl-lg text-black text-caption"> País</div>
            <q-input disable class="q-mt-sm" v-model="form.hoteleria.paisName" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
          <div class="q-pl-lg text-black text-caption"> ¿Donde daras Alojamiento?</div>
            <q-input disable class="q-mt-sm" v-model="form.hoteleria.ciudadName" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> Donde esta ubicado</div>
            <q-input disable autogrow class="q-mt-sm" v-model="form.hoteleria.ubicacion" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> ¿Esta pensado especialmente para tus hospedadores?</div>
            <q-input disable class="q-mt-sm" v-model="form.hoteleria.pensado" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> Presto servicios por parte de</div>
            <q-input disable class="q-mt-sm" v-model="form.hoteleria.presto" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
            <div class="q-pl-lg text-black text-caption"> Cantidad de huespedes</div>
            <q-input disable class="q-mt-sm" v-model="form.hoteleria.huespedes" outlined filled dense>
              <template v-slot:before>
                <q-icon name="pets" color="primary" />
              </template>
            </q-input>
              <div class="q-pl-lg q-mt-sm text-black text-caption"> Direccion</div>
              <q-input disable class="q-mt-sm" v-model="form.hoteleria.alojamiento.direccion" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Apartamento o numero</div>
              <q-input disable class="q-mt-sm" v-model="form.hoteleria.alojamiento.apartamento" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Ciudad</div>
              <q-input disable class="q-mt-sm" v-model="form.hoteleria.alojamiento.ciudad" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Estado</div>
              <q-input disable class="q-mt-sm" v-model="form.hoteleria.alojamiento.estado" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Codigo postal</div>
              <q-input disable class="q-mt-sm" v-model="form.hoteleria.alojamiento.codigo" outlined filled dense>
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Servicios que ofrece</div>
              <div class="q-ml-sm" v-for="(item, index) in form.hoteleria.ofrece" :key="index">
              <div class="q-ml-md">
              {{item}}
              </div>
              </div>
        </div>

                          <!-- <div class="q-mt-sm column">
                            <div  class="q-mt-md q-pl-md text-grey-10">Fotos que posee la tienda:</div>
                              <q-card class="q-pa-md bg-amber-1 shadow-up-3 q-mt-sm" style="border-top-left-radius:25px;border-top-right-radius:25px">
                              <q-scroll-area
                              horizontal
                              style="height: 110px;"
                            >
                              <div class="row no-wrap" style="width: 100%">
                                <q-card v-for="(item, index) in form.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
                                  <q-img :src="form.tiendaFiles ? baseu2 + item : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
                                </q-card>
                              </div>
                            </q-scroll-area>
                          </q-card>
                          </div> -->

                          </q-list>

                      <div class="full-width q-mb-xl">
                        <google-map :center="center" :zoom="10" @getBounds="getBounds" @newPlace="handleNewPlace" :withoutDirection="false" />
                      </div>
                    <div class="row justify-center q-pa-sm">
                      <q-btn color="primary" label="Actualizar Datos" @click="$router.push('/Datosedit')"/>
                    </div>
                </div>
            </q-card>
          </div>
    </div>
  </div>
</template>
<script>
import GoogleMap from '../components/GoogleMap'
import env from '../env'
export default {
  components: {
    GoogleMap
  },
  data () {
    return {
      datosusuario: false,
      datosproveedor: false,
      hoteleria: {},
      form: {},
      perfilFile: null,
      imgPerfil: '',
      baseu: '',
      baseu2: '',
      usuario: {},
      servicios: [],
      rol: null,
      paises: [],
      tiendaFiles: [],
      center: { lat: -33.4504117, lng: -70.6707553 },
      imgTienda: [],
      id_datos: ''
    }
  },
  mounted () {
    this.getUser()
    this.getPaises()
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/tienda_img/'
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(v => {
        console.log(v, 'veeee')
        if (v.estatusHotel === 2) {
          this.data = {}
          this.$q.dialog({
            title: 'Atención',
            message: 'Tu solicitud de Hoteleria fue rechazada, puedes volver a intentarlo.',
            cancel: false,
            persistent: true
          }).onOk(() => {
            // Ok
          }).onCancel(() => {
            // cancel
          })
        }
        if (v) {
          this.rol = v.roles[0]
          this.form = v
          this.center = this.form.ubicacion
          this.hoteleria = this.form.hoteleria
        }
        if (this.rol === 3) {
          this.datosproveedor = true
        }
        if (this.form.delivery === true) {
          this.delivery = true
        }
        if (this.rol === 2) {
          this.datosusuario = true
        }
        console.log(this.form, 'formulario2')
      })
    },
    getPaises () {
      this.$api.get('pais').then(res => {
        if (res) {
          this.paises = res
          console.log(this.paises, 'paises')
        }
      })
    },
    getBounds (bounds, center) {
      console.log(center, 'center')
    },
    handleNewPlace (place, coordinates) {
      console.log('handleNewPlace', coordinates, place, this.form, 'from')
      this.form.ubicacion = coordinates
      this.form.place = place
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
  background-color: #fff8bd;
  width: 250px;
  border-radius: 12px
}
</style>
