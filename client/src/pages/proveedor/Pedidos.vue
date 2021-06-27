<template>
  <div class="q-pa-sm">
    <q-header elevated class="bg-primary row justify-center items-center" style="width:100%; height:60px">
      <div class="text-white text-subtitle1 text-center">Tus pedidos</div>
    </q-header>

    <div class="q-mb-xl">
      <div class="text-subtitle1 text-bold">Pedidos en curso</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Ordena los pedidos por fechas para ver su estado</div>
    </div>

    <div class="q-mb-xl">
      <div class="text-subtitle1 text-bold">Filtra tus pedidos</div>
      <div class="q-mb-sm text-caption text-grey-8 text-italic">Historial de pedidos</div>
      <div class="row q-px-lg">
        <div class="col2 text-caption">Selecciona <br/>el mes</div>
        <q-select outlined dense filled class="col q-mx-md" placeholder="Mes" v-model="selectMes" :options="['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']"/>
        <q-btn class="col2" label="Buscar" color="primary" no-caps/>
      </div>
    </div>

      <div v-if="arriendos.length" class="q-mb-md column items-center" style="width: 100%;">
        <q-card v-for="(item, index) in arriendos" :key="index" class="q-mb-md shadow-5" style="width: 95%;">
            <div class="row justify-between full-width q-pa-sm">
              <div class="text-subtitle2"> <b>Fecha de compra </b> 00/00/0000 </div>
              <div class="text-subtitle2"> <b>Pedido nº </b> {{index}} </div>
            </div>

            <div class="bg-primary text-subtitle1 q-px-sm q-py-xs ellipsis text-white"
                style="width:90%; border-top-right-radius: 5px; border-bottom-right-radius: 5px">
                <b>Estado del pedido: </b> En Local
            </div>

            <div class="full-width q-my-lg" v-if="item.detalles">
              <div class="q-mb-sm">
                <div class="text-caption text-bold">Detalles de huéspedes arriendo</div>
                <div class="text-caption text-italic">Detalles del arriendo</div>
              </div>
              <div class="column q-my-lg">
                <div class="row q-mb-md">
                  <div class="col column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-secondary">
                      <q-img style="height: 100%;" :src="''"/>
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-caption text-grey-7 text-bold">Datos del representante</div>
                    <div class="text-grey-7" style="font-size: 11px">Nombre del representante</div>
                    <div class="text-grey-7" style="font-size: 11px">Telefono</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col column items-center">
                    <q-avatar rounded style="height: 80px; width: 80px; border-radius: 15px;" class="bg-secondary">
                      <q-img style="height: 100%;" :src="''"/>
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-caption text-grey-7 text-bold">Datos de mascota</div>
                    <div class="text-grey-7" style="font-size: 11px">Nombre de mascota</div>
                    <div class="text-grey-7" style="font-size: 11px">Raza</div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row justify-between q-mb-md">
                  <div class="text-caption text-grey">Datos de mascota</div>
                  <div class="text-caption text-grey-7 text-bold">10 dias</div>
                </div>
                <div class="column q-mb-md">
                  <div class="row justify-between">
                    <div class="text-caption text-grey">Inicio del alojamiento</div>
                    <div class="text-caption text-grey-7 text-bold">10/01/2021</div>
                  </div>
                  <div class="row justify-between">
                    <div class="text-caption text-grey">Fin del alojamiento</div>
                    <div class="text-caption text-grey-7 text-bold">12/01/2021</div>
                  </div>
                </div>
                <div class="row justify-between">
                  <div class="text-caption text-grey">Precio total</div>
                  <div class="text-primary">$17.95</div>
                </div>
              </div>
            </div>
            <div class="row justify-center q-py-lg">
                <q-btn no-caps class="q-py-sm" color="primary" label="Ver detalles" style="width: 70%"
                @click="item.detalles = !item.detalles"/>
            </div>
        </q-card>
      </div>

      <div class="column items-center q-mb-xl">
        <q-btn v-if="arriendos.length > 3" @click="ver = !ver" class="q-pa-sm" color="primary" :label="ver ? 'Ver menos' :'Ver más'" style="width: 70%;" no-caps/>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectMes: '',
      arriendos: [{ detalles: false }, { detalles: false }, { detalles: false }, { detalles: false }, { detalles: false }],
      ver: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
