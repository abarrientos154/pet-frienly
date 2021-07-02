<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center full-width" style="height: 60px">
      <div class="text-white text-subtitle1 text-center">Tus arriendos</div>
    </q-header>

    <div class="q-mb-lg">
      <div class="text-subtitle1 text-bold">Arriendos en curso</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Ordena los arriendos por fechas para ver su disponibilidad</div>
    </div>

    <q-list v-if="enCurso.length" class="q-mb-md row justify-center" style="width: 100%; height: auto;">
        <q-card v-for="(item, index) in enCurso" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img :src="baseuHospedaje + item.image" style="height: 175px;">
            <q-btn no-caps dense color="primary" class="q-mt-md q-pr-xl q-pl-sm" style="border-top-right-radius: 12px; border-bottom-right-radius: 10px;">
              <div class="row">
                <div class="q-mr-xs">Espacio</div>
                <div class="text-bold">ARRENDADO</div>
              </div>
            </q-btn>
          </q-img>
          <q-card-section class="column items-center">
            <div class="row justify-between full-width q-mb-sm">
              <div class="text-caption"><b>Fecha de compra </b>{{item.fecha_arriendo}}</div>
              <div class="text-caption" style="font-size: 12px"><b>Arriendo nº </b>{{index + 1}}</div>
            </div>
            <div class="full-width q-my-lg" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles de huéspedes arriendo</div>
                <div class="text-caption text-italic">Detalles del arriendo</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md">
                  <div class="col column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="baseuRepresentante + item.cliente_id"/>
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-caption text-grey-7 text-bold">Datos del representante</div>
                    <div class="text-grey-7" style="font-size: 11px">{{item.representante ? item.representante.name : ''}}</div>
                    <div class="text-grey-7" style="font-size: 11px">{{item.representante ? item.representante.phone : ''}}</div>
                  </div>
                </div>
                <div class="row q-mb-md" v-for="(mascota, index) in item.mascotas" :key="index">
                  <div class="col column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="baseuMascotas + mascota.images[0]"/>
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-caption text-grey-7 text-bold">Datos de mascota</div>
                    <div class="text-grey-7" style="font-size: 11px">{{mascota.name}}</div>
                    <div class="text-grey-7" style="font-size: 11px">{{mascota.race}}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row justify-between q-mb-md">
                  <div class="text-caption text-grey-8">Días arrendados</div>
                  <div class="text-caption text-grey-8 text-bold">{{item.dias}} días</div>
                </div>
                <div class="column q-mb-md">
                  <div class="row justify-between">
                    <div class="text-caption text-grey-8">Inicio del alojamiento</div>
                    <div class="text-caption text-grey-8 text-bold">{{item.fecha_ingreso}}</div>
                  </div>
                  <div class="row justify-between">
                    <div class="text-caption text-grey-8">Fin del alojamiento</div>
                    <div class="text-caption text-grey-8 text-bold">{{item.fecha_salida}}</div>
                  </div>
                </div>
                <div class="row justify-between">
                  <div class="text-caption text-grey-8">Precio total</div>
                  <div class="text-primary">${{item.total}}</div>
                </div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg" style="width:100%">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.detalles = true"/>
            </div>
            <div v-else class="row justify-center q-py-lg" style="width:100%">
                <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                @click="item.detalles = false"/>
            </div>
          </q-card-section>
        </q-card>
      </q-list>

    <div class="q-mb-xl">
      <div class="text-subtitle1 text-bold">Filtra tus arriendos</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Historial de arriendos</div>
      <div class="row q-px-lg">
        <div class="col-12 text-caption">Selecciona el mes</div>
        <q-input filled readonly dense v-model="selectMes" class="col q-mr-md" placeholder="Mes" mask="##" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="selectMes" mask="MM" minimal emit-immediately default-view="Months"
                  @input="$refs.qDateProxy.hide()">
                    <div class="row items-center justify-between">
                      <q-btn @click="arriendos = allArriendos, selectMes = '', $refs.qDateProxy.hide()" label="Todos" color="primary" flat />
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        <q-btn class="col2" :disable="selectMes !== '' ? false : true" label="Buscar" color="primary" no-caps @click="filtrarArriendos()"/>
      </div>
    </div>

    <div>
      <q-list v-if="arriendos.length" class="q-mb-md row justify-center" style="width: 100%; height: auto;">
        <q-card v-for="(item, index) in arriendos" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img :src="baseuHospedaje + item.image" style="height: 175px;">
            <q-btn no-caps dense color="primary" class="q-mt-md q-pr-xl q-pl-sm" style="border-top-right-radius: 12px; border-bottom-right-radius: 10px;">
              <div class="row">
                <div class="q-mr-xs">Espacio</div>
                <div class="text-bold">ARRENDADO</div>
              </div>
            </q-btn>
          </q-img>
          <q-card-section class="column items-center">
            <div class="row justify-between full-width q-mb-sm">
              <div class="text-caption"><b>Fecha de compra </b>{{item.fecha_arriendo}}</div>
              <div class="text-caption" style="font-size: 12px"><b>Arriendo nº </b>{{index + 1}}</div>
            </div>
            <div class="full-width q-my-lg" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles de huéspedes arriendo</div>
                <div class="text-caption text-italic">Detalles del arriendo</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md">
                  <div class="col column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="baseuRepresentante + item.cliente_id"/>
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-caption text-grey-7 text-bold">Datos del representante</div>
                    <div class="text-grey-7" style="font-size: 11px">{{item.representante ? item.representante.name : ''}}</div>
                    <div class="text-grey-7" style="font-size: 11px">{{item.representante ? item.representante.phone : ''}}</div>
                  </div>
                </div>
                <div class="row q-mb-md" v-for="(mascota, index) in item.mascotas" :key="index">
                  <div class="col column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="baseuMascotas + mascota.images[0]"/>
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-caption text-grey-7 text-bold">Datos de mascota</div>
                    <div class="text-grey-7" style="font-size: 11px">{{mascota.name}}</div>
                    <div class="text-grey-7" style="font-size: 11px">{{mascota.race}}</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row justify-between q-mb-md">
                  <div class="text-caption text-grey-8">Días arrendados</div>
                  <div class="text-caption text-grey-8 text-bold">{{item.dias}} días</div>
                </div>
                <div class="column q-mb-md">
                  <div class="row justify-between">
                    <div class="text-caption text-grey-8">Inicio del alojamiento</div>
                    <div class="text-caption text-grey-8 text-bold">{{item.fecha_ingreso}}</div>
                  </div>
                  <div class="row justify-between">
                    <div class="text-caption text-grey-8">Fin del alojamiento</div>
                    <div class="text-caption text-grey-8 text-bold">{{item.fecha_salida}}</div>
                  </div>
                </div>
                <div class="row justify-between">
                  <div class="text-caption text-grey-8">Precio total</div>
                  <div class="text-primary">${{item.total}}</div>
                </div>
                <div v-if="item.calificado" class="row items-center justify-between q-pt-sm">
                    <div class="row items-center">
                      <div class="text-caption text-grey-9">Calificado</div>
                      <q-icon name="star" class="text-orange" size="sm" />
                    </div>
                    <div>
                      <q-btn no-caps flat color="orange" label="Ver"
                      @click="calificado = item.calificacion, verCalificacion = true"/>
                    </div>
                </div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg" style="width:100%">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.detalles = true"/>
            </div>
            <div v-else class="row justify-center q-py-lg" style="width:100%">
                <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                @click="item.detalles = false"/>
            </div>
          </q-card-section>
        </q-card>
      </q-list>

      <div class="column items-center q-mb-xl">
        <q-btn v-if="arriendos.length > 3" @click="ver = !ver" class="q-pa-sm" color="primary" :label="ver ? 'Ver menos' :'Ver más'" style="width: 70%;" no-caps/>
      </div>

      <q-dialog persistent v-model="verCalificacion">
        <q-card style="width: 100%; border-radius:20px">
            <div class="q-pt-lg">
                <div class="row justify-center items-center bg-primary text-white" style="height: 50px; width:100%">Reserva finalizada</div>
                <div class="row justify-center q-py-md" style="width:100%">
                    <q-img :src="calificado.cliente_id ? baseuRepresentante + calificado.cliente_id : 'noimg.png'" style="width:80%; height:200px; border-radius: 20px" />
                </div>
                <div class="q-px-md">
                    <div class="text-caption text-bold">Calificación</div>
                    <q-rating
                        v-model="calificado.calificacion"
                        readonly
                        color="orange"
                        size="25px"
                        icon="star"
                    />
                </div>
                <div class="q-px-md q-pt-sm">
                    <div class="text-caption text-bold">Comentario</div>
                    <q-input filled outlined readonly v-model="calificado.comentario" type="textarea"/>
                </div>
                <div class="column items-center q-pt-lg">
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Cerrar" style="width: 70%"
                    @click="verCalificacion = false"/>
                </div>
            </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import env from '../../env'
import moment from 'moment'
export default {
  data () {
    return {
      ver: false,
      verCalificacion: false,
      selectMes: '',
      baseuHospedaje: '',
      baseuRepresentante: '',
      baseuMascotas: '',
      calificado: {},
      allArriendos: [],
      enCurso: [],
      arriendos: []
    }
  },
  mounted () {
    this.baseuHospedaje = env.apiUrl + 'hospedajes_img/'
    this.baseuRepresentante = env.apiUrl + 'perfil_img/'
    this.baseuMascotas = env.apiUrl + 'mascota_img/'
    this.getArriendos()
  },
  methods: {
    getArriendos () {
      this.$q.loading.show({
        message: 'Cargando arriendos'
      })
      this.$api.get('arriendos').then(res => {
        if (res) {
          this.allArriendos = res.filter(v => v.expirado)
          this.enCurso = res.filter(v => !v.expirado)
          this.arriendos = this.allArriendos.slice(0, 4)
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    filtrarArriendos () {
      this.arriendos = this.allArriendos.filter(v => {
        if (moment(v.created_at).format('YYYY/MM') === moment().format('YYYY') + '/' + String(this.selectMes)) {
          return v
        }
      })
    },
    verMas () {
      if (!this.ver) {
        this.arriendos = this.allArriendos
      } else {
        this.arriendos = this.allArriendos.slice(0, 4)
      }
      this.ver = !this.ver
    }
  }
}
</script>
