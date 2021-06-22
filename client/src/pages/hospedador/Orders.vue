<template>
  <div class="q-pa-sm">
    <div class="q-mb-xl">
      <div class="text-subtitle1 text-bold">Arriendos en curso</div>
      <div class="q-mb-sm text-caption text-grey-6 text-italic">Ordena los arriendos por fechas para ver su disponibilidad</div>
      <div class="row q-px-lg">
        <div class="col2 text-caption">Selecciona <br/>el mes</div>
        <q-select outlined dense filled class="col q-mx-md" placeholder="Mes" v-model="selectMes" :options="['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']"/>
        <q-btn class="col2" label="Buscar" color="primary" no-caps/>
      </div>
    </div>
    <div>
      <q-list class="q-mb-md row justify-center" style="width: 100%; height: auto;" v-if="arriendos.length <= 3">
        <q-card v-for="(item, index) in arriendos" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img class="bg-secondary" :src="''" style="height: 175px;">
            <q-btn no-caps dense color="primary" class="q-mt-md q-pr-xl q-pl-sm" style="border-top-right-radius: 12px; border-bottom-right-radius: 10px;">
              <div class="row">
                <div class="q-mr-xs">Espacio</div>
                <div class="text-bold">ARRENDADO</div>
              </div>
            </q-btn>
          </q-img>
          <q-card-section class="column items-center">
            <div class="row justify-between full-width q-mb-sm">
              <div class="text-caption text-bold">Fecha de compra</div>
              <div class="text-caption text-bold" style="font-size: 12px">Arriendo nº</div>
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
            <q-btn no-caps flat class="bg-primary text-white q-pa-xs" @click="item.detalles = !item.detalles" label="Ver detalles" style="width: 70%"/>
          </q-card-section>
        </q-card>
      </q-list>
      <q-list class="q-mb-md row justify-center" style="width: 100%; height: auto;" v-else-if="ver">
        <q-card v-for="(item, index) in arriendos" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img class="bg-secondary" :src="''" style="height: 175px;">
            <q-btn no-caps dense color="primary" class="q-mt-md q-pr-xl q-pl-sm" style="border-top-right-radius: 12px; border-bottom-right-radius: 10px;">
              <div class="row">
                <div class="q-mr-xs">Espacio</div>
                <div class="text-bold">ARRENDADO</div>
              </div>
            </q-btn>
          </q-img>
          <q-card-section class="column items-center">
            <div class="row justify-between full-width q-mb-sm">
              <div class="text-caption text-bold">Fecha de compra</div>
              <div class="text-caption text-bold" style="font-size: 12px">Arriendo nº</div>
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
            <q-btn no-caps flat class="bg-primary text-white q-pa-xs" @click="item.detalles = !item.detalles" label="Ver detalles" style="width: 70%"/>
          </q-card-section>
        </q-card>
      </q-list>
      <q-list v-else class="q-mb-md row justify-center" style="width: 100%; height: auto;">
        <q-card v-for="index in 3" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img class="bg-secondary" :src="''" style="height: 175px;">
            <q-btn no-caps dense color="primary" class="q-mt-md q-pr-xl q-pl-sm" style="border-top-right-radius: 12px; border-bottom-right-radius: 10px;">
              <div class="row">
                <div class="q-mr-xs">Espacio</div>
                <div class="text-bold">ARRENDADO</div>
              </div>
            </q-btn>
          </q-img>
          <q-card-section class="column items-center">
            <div class="row justify-between full-width q-mb-sm">
              <div class="text-caption text-bold">Fecha de compra</div>
              <div class="text-caption text-bold" style="font-size: 12px">Arriendo nº</div>
            </div>
            <div class="full-width q-my-lg" v-if="arriendos[index - 1].detalles">
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
            <q-btn no-caps flat class="bg-primary text-white q-pa-xs" @click="arriendos[index - 1].detalles = !arriendos[index - 1].detalles" label="Ver detalles" style="width: 70%"/>
          </q-card-section>
        </q-card>
      </q-list>
      <div class="column items-center q-mb-xl">
        <q-btn v-if="arriendos.length > 3" @click="ver = !ver" class="q-pa-sm" color="primary" :label="ver ? 'Ver menos' :'Ver más'" style="width: 70%;" no-caps/>
      </div>
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
