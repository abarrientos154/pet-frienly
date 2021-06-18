<template>
  <div class="q-pa-sm">
    <div class="row q-pa-sm">
      <div class="col q-mr-sm" style="max-width: 250px;">
        <q-avatar rounded style="height: 100px; width: 100%;" class="bg-secondary q-my-xs">
          <q-img style="height: 100%;" :src="''"/>
        </q-avatar>
        <div class="row justify-between">
          <q-rating v-model="ratingModel" color="orange-8" size="18px" icon="star"/>
          <div class="q-pa-sm text-green-9 text-bold">{{"("}}{{this.ratingModel}}{{")"}}</div>
        </div>
      </div>
      <div class="col">
        <div class="text-subtitle1 text-bold">Bienvenido</div>
        <q-scroll-area class="q-mb-sm" style="height: 75px;">
          <div class="text-caption">{{user.my_space.description}}</div>
        </q-scroll-area>
        <q-btn class="full-width" label="Editar perfil" color="primary" no-caps/>
      </div>
    </div>

    <div>
      <div class="text-subtitle1 text-bold">Informacion</div>
      <div class="row">
        <div class="col q-mx-md">
          <div class="text-subtitle3 text-bold text-grey-6">Ciudad</div>
          <div class="text-caption text-grey-6">{{cityUser.name}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Direccion</div>
          <div class="text-caption text-grey-6">{{user.my_space.direction}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Correo de contacto</div>
          <div class="text-caption text-grey-6">{{user.my_space.email}}</div>
        </div>
        <div class="col q-mx-md">
          <div class="text-subtitle3 text-bold text-grey-6">Horarios de atencóon</div>
          <div class="text-caption text-grey-6">Apertura {{user.my_space.hora_inicio}}</div>
          <div class="text-caption text-grey-6">Cierre {{user.my_space.hora_cierre}}</div>
          <div class="text-subtitle3 text-bold text-grey-6">Telefono de contacto</div>
          <div class="text-caption text-grey-6">{{user.my_space.phone}}</div>
        </div>
      </div>
    </div>

    <div>
      <div class="text-subtitle1 text-bold">Reseñas de clientes</div>
      <q-scroll-area horizontal style="height: 150px">
        <div class="row no-wrap" style="width: 100%">
          <q-card class="q-mt-sm q-mx-sm shadow-6" v-for="index in 3" :key="index" style="width: 300px; height: 125px;">
            <q-card-section horizontal style="height: 100%;">
              <q-card-section>
                <q-avatar rounded style="height: 100%; width: 100px; border-radius: 20px;" class="bg-secondary">
                  <q-img style="height: 100%;" :src="''"/>
                </q-avatar>
              </q-card-section>
              <div class="q-py-md q-py-md column">
                <div class="text-subtitle3 text-bold">Titulo del comentario</div>
                <div class=" col text-caption text-grey-6">{{lorem}}</div>
                <q-rating max="5" size="15px" v-model="rating" color="orange-8" icon="star_border" icon-selected="star" icon-half="star_half" no-dimming />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-scroll-area>
    </div>

    <div>
      <div class="text-subtitle1 text-bold q-mb-md">Conoce los espacios disponibles</div>
      <q-list class="q-mb-md row justify-center" style="width: 100%; height: auto;">
        <q-card v-for="index in ver" :key="index" class=" q-mb-md col no-wrap" style="min-width: 300px; max-width: 375px; border-radius: 12px;">
          <q-img class="bg-secondary" :src="''" style="height: 175px;">
            <q-btn position="top-left" round icon="favorite" color="primary" size="10px" class="q-mt-sm q-ml-sm"/>
          </q-img>
          <div class="row justify-end q-mb-md q-mr-sm" style="margin-top: -70px;">
            <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="directions_car" size="50px" style="border-radius: 10px;"/>
            <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="pool" size="50px" style="border-radius: 10px;"/>
            <q-avatar rounded class="bg-orange-2 text-black q-mx-xs" icon="directions_walk" size="50px" style="border-radius: 10px;"/>
          </div>
          <q-card-section class="row justify-between">
            <div>
              <div class="text-subtitle2" style="font-size: 13px">Nombre del alojamiento</div>
              <div class="items-center row text-grey">
                  <q-icon name="place" />
                  <div class="text-subtitle2" style="font-size: 12px">Pais, Ciudad</div>
              </div>
            </div>
            <q-btn no-caps flat dense rounded class="bg-primary text-white q-pa-sm">$12.000 por noche</q-btn>
          </q-card-section>
        </q-card>
      </q-list>
      <div class="column items-center q-mb-xl">
        <q-btn class="q-pa-sm" color="primary" :label="ver === 6 ? 'Ver menos' : 'Ver más'" style="width: 70%;" @click="ver === 6 ? ver = 3 : ver = 6" no-caps/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lorem: '',
      baseu: '',
      user: {},
      cityUser: {},
      ratingModel: 4,
      rating: 4,
      ver: 3
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_logueado').then(res => {
        if (res) {
          this.user = res
          this.getCityUser()
          console.log(this.user)
        }
      })
    },
    getCityUser () {
      this.$api.get('ciudad_by_id/' + this.user.my_space.ciudad_id).then(res => {
        if (res) {
          this.cityUser = res
          console.log(this.cityUser)
        }
      })
    }
  }
}
</script>
