<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Tus pedidos</div>
    </q-header>

    <div class="q-mb-lg">
      <div class="text-subtitle1 text-bold">Pedidos en curso</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Ordena los pedidos por fechas para ver su estado</div>
    </div>

    <div v-if="pendientes.length" class="q-mb-md column items-center" style="width: 100%;">
        <q-card v-for="(item, index) in pendientes" :key="index" class="q-mb-md shadow-5" style="width: 95%;">
            <div class="row justify-between full-width q-pa-sm">
              <div class="text-subtitle2"> <b>Fecha de compra </b> {{item.fecha_compra}} </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index + 1}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> {{item.status}}
            </div>

            <div class="full-width q-my-lg q-px-md" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles del pedido</div>
                <div class="text-caption text-italic">Los {{item.servicios ? 'servicios' : 'productos'}} adquiridos fueron</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md" v-for="(prod, index2) in item.productos" :key="index2">
                  <div class="col-4 column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="prod.servicio ? baseuServicios + prod.image : baseuproductos + prod.image"/>
                    </q-avatar>
                  </div>
                  <div class="col-8 column justify-between">
                    <div class="text-caption text-grey-10">{{prod.name}}</div>
                    <div class="row justify-between">
                        <div class="text-primary" >${{prod.price}}</div>
                        <div class="text-primary" >{{prod.cantidad_compra}} {{prod.servicio ? 'h' : 'u'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-px-sm">
                <div class="row justify-between q-mb-sm">
                  <div class="text-caption text-grey-7">Cantidad de {{item.servicios ? 'servicios' : 'artículos'}}</div>
                  <div class="text-caption text-black">{{item.totalProductos}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Valor</div>
                  <div class="text-caption text-black">${{item.totalValor}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Precio total</div>
                  <div class="text-subtitle1 text-black">${{item.totalValor}}</div>
                </div>
              </div>
              <div v-if="item.status === 'Enviado'" class="q-mb-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Seleccione el estado que tendrá el pedido.</div>
                <q-select dense filled v-model="item.newStatus" :options="['Recibe conforme']"/>
              </div>
              <div v-if="item.status === 'Enviado'" class="q-my-sm">
                <div class="text-caption text-bold">Estado del pedido</div>
                <div class="text-caption text-italic q-mb-sm">Una vez que cambias el estado a recibido, se marcará como completada la operación.</div>
              </div>
            </div>
            <div v-if="!item.detalles" class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.newStatus = 'Enviado', item.detalles = true"/>
            </div>
            <div v-else>
                <div class="column items-center q-py-lg">
                    <q-btn v-if="item.status === 'Enviado'" :disable="item.newStatus === 'Enviado' ? true : false" no-caps class="q-py-sm" color="primary" label="Cambiar estado" style="width: 70%"
                    @click="cambiarStatus(item)"/>
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                    @click="item.detalles = false"/>
                </div>
            </div>
        </q-card>
      </div>
    <div v-else class="row items-center justify-center" style="height: 100px;">No hay pedidos pendientes</div>

    <div class="q-mb-lg">
      <div class="text-subtitle1 text-bold">Filtra tus pedidos</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Historial de pedidos</div>
      <div class="row q-px-lg">
        <div class="col-12 text-caption">Selecciona el mes</div>
        <q-input filled readonly dense v-model="selectMes" class="col q-mr-md" placeholder="Mes" mask="##" @click="$refs.qDateProxy.show()">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="selectMes" mask="MM" minimal emit-immediately default-view="Months"
                  @input="$refs.qDateProxy.hide()">
                    <div class="row items-center justify-between">
                      <q-btn @click="pedidos = allPedidos, selectMes = '', $refs.qDateProxy.hide()" label="Todos" color="primary" flat />
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        <q-btn class="col2" :disable="selectMes !== '' ? false : true" label="Buscar" color="primary" no-caps @click="filtrarPedidos()"/>
      </div>
    </div>

      <div v-if="pedidos.length" class="q-mb-md column items-center" style="width: 100%;">
        <q-card v-for="(item, index) in pedidos" :key="index" class="q-mb-md shadow-5" style="width: 95%;">
            <div class="row justify-between full-width q-pa-sm">
              <div class="text-subtitle2"> <b>Fecha de compra </b> {{item.fecha_compra}} </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index + 1}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> {{item.status}}
            </div>

            <div class="full-width q-my-lg q-px-md" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles del pedido</div>
                <div class="text-caption text-italic">Los {{item.servicios ? 'servicios' : 'productos'}} adquiridos fueron</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md" v-for="(prod, index2) in item.productos" :key="index2">
                  <div class="col-4 column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-grey">
                      <q-img style="height: 100%;" :src="prod.servicio ? baseuServicios + prod.image : baseuproductos + prod.image"/>
                    </q-avatar>
                  </div>
                  <div class="col-8 column justify-between">
                    <div class="text-caption text-grey-10">{{prod.name}}</div>
                    <div class="row justify-between">
                        <div class="text-primary" >${{prod.price}}</div>
                        <div class="text-primary" >{{prod.cantidad_compra}} {{prod.servicio ? 'h' : 'u'}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="q-px-sm">
                <div class="row justify-between q-mb-sm">
                  <div class="text-caption text-grey-7">Cantidad de {{item.servicios ? 'servicios' : 'artículos'}}</div>
                  <div class="text-caption text-black">{{item.totalProductos}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Valor</div>
                  <div class="text-caption text-black">${{item.totalValor}}</div>
                </div>
                <q-separator/>
                <div class="row justify-between q-my-sm">
                  <div class="text-caption text-grey-7">Precio total</div>
                  <div class="text-subtitle1 text-black">${{item.totalValor}}</div>
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
            <div v-if="!item.detalles" class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.detalles = true"/>
            </div>
            <div v-else>
                <div class="column items-center q-py-lg">
                    <q-btn v-if="!item.calificado" no-caps class="q-py-sm" color="primary" label="Calificar" style="width: 70%"
                    @click="accionCalificar(item)"/>
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Ver menos" style="width: 70%"
                    @click="item.detalles = false"/>
                </div>
            </div>
        </q-card>
      </div>
      <div v-else class="row items-center justify-center" style="height: 100px;">No hay pedidos completados</div>

      <div class="column items-center q-mb-xl">
        <q-btn v-if="allPedidos.length > 4" @click="verMas()" class="q-pa-sm" color="primary" :label="ver ? 'Ver menos' :'Ver más'" style="width: 70%;" no-caps/>
      </div>

      <q-dialog persistent v-model="calificar">
        <q-card style="width: 100%; border-radius:20px">
            <div class="q-pt-lg">
                <div class="row justify-center items-center bg-primary text-white" style="height: 50px; width:100%">Pedido finalizado</div>
                <div class="row justify-center q-py-md" style="width:100%">
                    <q-img :src="dataSelec.cliente_id ? baseuRepresentante + dataSelec.cliente_id : 'noimg.png'" style="width:80%; height:200px; border-radius: 20px" />
                </div>
                <div class="q-px-md">
                    <div class="text-caption text-bold">Calificación</div>
                    <div :class="$v.form.calificacion.$error ? 'text-red' : 'text-grey-8'" class="text-caption text-italic">Califica correctamente la tienda</div>
                    <q-rating
                        v-model="calificacion"
                        color="orange"
                        size="25px"
                        icon="star"
                    />
                </div>
                <div class="q-px-md q-pt-sm">
                    <div class="text-caption text-bold">Comentario</div>
                    <div class="text-caption text-grey-8 text-italic">Máximo 100 carácteres</div>
                    <q-input filled outlined maxlength="110" v-model="form.comentario" type="textarea"
                    :error="$v.form.comentario.$error" error-message="Este campo es requerido"  @blur="$v.form.comentario.$touch()"/>
                </div>
                <div class="column items-center q-pt-lg">
                    <q-btn no-caps class="q-py-sm" color="primary" label="Publicar" style="width: 70%"
                    @click="publicar()"/>
                    <q-btn no-caps flat class="q-mt-sm" color="white" text-color="grey-8" label="Omitir" style="width: 70%"
                    @click="getPedidos()"/>
                </div>
            </div>
        </q-card>
      </q-dialog>

      <q-dialog persistent v-model="verCalificacion">
        <q-card style="width: 100%; border-radius:20px">
            <div class="q-pt-lg">
                <div class="row justify-center items-center bg-primary text-white" style="height: 50px; width:100%">Pedido finalizado</div>
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
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'
import moment from 'moment'
import env from '../../env'
export default {
  data () {
    return {
      ver: false,
      calificar: false,
      verCalificacion: false,
      selectMes: '',
      baseuproductos: '',
      baseuServicios: '',
      baseuRepresentante: '',
      newStatus: '',
      calificacion: 0,
      calificado: {},
      dataSelec: {},
      form: {},
      allPedidos: [],
      pedidos: [],
      pendientes: []
    }
  },
  validations: {
    form: {
      calificacion: { required: requiredIf(function () { return this.calificacion < 1 }) },
      comentario: { required }
    }
  },
  mounted () {
    this.baseuRepresentante = env.apiUrl + 'perfil_img/'
    this.baseuproductos = env.apiUrl + 'productos_img/'
    this.baseuServicios = env.apiUrl + 'servicio_img/'
    this.getPedidos()
  },
  methods: {
    getPedidos () {
      this.$q.loading.show({
        message: 'Cargando pedidos'
      })
      this.$api.get('pedidos').then(res => {
        if (res) {
          this.allPedidos = res.filter(v => v.status === 'Completado')
          this.pedidos = this.allPedidos.slice(0, 4)
          this.pendientes = res.filter(v => v.status === 'En Local' || v.status === 'Enviado')
          this.calificar = false
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    cambiarStatus (data) {
      this.$q.loading.show({
        message: 'Cambiando estado'
      })
      this.dataSelec = data
      this.$api.put('pedido_status/' + data._id, { status: 'Completado' }).then(res => {
        if (res) {
          this.calificacion = 0
          this.form = {}
          this.$v.form.$reset()
          this.calificar = true
          this.$q.loading.hide()
        } else {
          this.$q.loading.hide()
        }
      })
    },
    publicar () {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.calificacion = this.calificacion
        this.form.tienda_id = this.dataSelec.tienda_id
        this.form.cliente_id = this.dataSelec.cliente_id
        this.form.pedido_id = this.dataSelec._id
        this.$api.post('calificar', this.form).then(res => {
          if (res) {
            this.getPedidos()
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
        })
      }
    },
    accionCalificar (data) {
      this.calificacion = 0
      this.form = {}
      this.$v.form.$reset()
      this.dataSelec = data
      this.calificar = true
    },
    filtrarPedidos () {
      this.pedidos = this.allPedidos.filter(v => {
        if (moment(v.created_at).format('YYYY/MM') === moment().format('YYYY') + '/' + String(this.selectMes)) {
          return v
        }
      })
    },
    verMas () {
      if (!this.ver) {
        this.pedidos = this.allPedidos
      } else {
        this.pedidos = this.allPedidos.slice(0, 4)
      }
      this.ver = !this.ver
    }
  }
}
</script>
