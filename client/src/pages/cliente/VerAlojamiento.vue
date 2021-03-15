<template>
    <div class="column items-center">
        <div class="text-h4 text-center q-my-md">Nombre del Alojamiento</div>
        <q-card class="dimension">
            <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            >
                <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            </q-carousel>
            <q-card-section>
                <div class="text-subtitle1">
                    Nombre del Alojamiento
                </div>
                <div class="row justify-between">
                    <div class="row">
                        <q-icon class="q-mx-sm" name="place" />
                        <div class="text-subtitle2">Pais Ciudad</div>
                    </div>
                    <div>
                        <q-btn flat dense icon="send" class="q-pa-sm bg-primary" text-color="white">Hablar</q-btn>
                    </div>
                </div>
                <q-rating class="q-my-md" v-model="stars" :max="5" size="32px" />
                <q-separator/>
                <q-scroll-area
                    horizontal
                    style="height: 80px; width: 100%;"
                    class="q-my-md"
                    :visible="false"
                >
                    <div class="row no-wrap">
                        <div v-for="(icon, index) in icons" :key="index" class="column q-mx-xl">
                            <q-icon :name="icon.icon" class="bg-primary" style="border-radius:10px" size="50px"/>
                            <div class="text-subtitle2">{{icon.name}}</div>
                        </div>
                    </div>
                </q-scroll-area>
            </q-card-section>
            <q-card-section>
                <div>
                    <div class="text-subtitle1">
                        Conoce nuestro alojamiento
                    </div>
                    <div class="text-body1">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil ullam quibusdam fugiat eveniet sint aliquam hic quae ipsum? Repellat dolorem numquam quis. Explicabo maiores eligendi velit ipsum voluptatem iusto quidem?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil ullam quibusdam fugiat eveniet sint aliquam hic quae ipsum? Repellat dolorem numquam quis. Explicabo maiores eligendi velit ipsum voluptatem iusto quidem?
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil ullam quibusdam fugiat eveniet sint aliquam hic quae ipsum? Repellat dolorem numquam quis. Explicabo maiores eligendi velit ipsum voluptatem iusto quidem?
                    </div>
                </div>
                <div class="column items-center q-my-md">
                    <q-btn-group style="border-radius:10px">
                        <q-btn color="primary" text-color="white" label="Reserva ahora!" class="q-pa-sm"/>
                        <q-btn color="amber-2" text-color="black" label="$200 por día" class="q-pa-sm"/>
                    </q-btn-group>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 4,
      icons: [
        { name: 'Parking', icon: 'local_parking' },
        { name: 'Piscina', icon: 'pool' },
        { name: 'Paseo', icon: 'directions_walk' },
        { name: 'Restaurante', icon: 'restaurant' }
      ]
    }
  }
}
</script>

<style>
    .dimension {
        max-width: 800px;
        min-width: 90%;
    }
</style>
