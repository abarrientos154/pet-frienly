<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="text-h4" color="black" style="text-align: center">Representante Legal</div>
         <q-img
          src="https://cdn.quasar.dev/img/image-src.png"
          style="height: 40%; width: 100%; margin-bottom: 20px; margin-top: 20px;"
        >
        </q-img>
         <div style="text-align: left; padding-top: 20px">
           Nombre
           <q-input filled v-model="form.nombre"  dense placeholder="Nombre del representante legal"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Apellidos
           <q-input filled v-model="form.apellidos"  dense placeholder="Coloca aambos apellidos"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Fecha de Nacimiento
           <q-input type="date" filled v-model="form.fecha_nac"  dense placeholder="Nombre del representante legal"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Telefono de Contacto
           <q-input type="tel" filled v-model="form.telefono"  dense placeholder="+34543234"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Correo de contacto
           <q-input filled v-model="form.correo"  dense placeholder="micorreo@petfriendly.com "/>
         </div>
         <div style="text-align: left; padding-top: 30px">
           Imágenes de documento de identificacion
           <q-file
            :value="files"
            label="Cargar Imagen"
            bg-color="primary"
            label-color="white"
            filled
            multiple
            style="width: 50%"
          >
          <template v-slot:file="{ index, file }">
            <q-chip
              class="full-width q-my-xs"
              :removable="isUploading && uploadProgress[index].percent < 1"
              square
              @remove="cancelFile(index)"
            >
              <q-linear-progress
                class="absolute-full full-height"
                :value="uploadProgress[index].percent"
                :color="uploadProgress[index].color"
                track-color="grey-2"
              />

              <q-avatar>
                <q-icon :name="uploadProgress[index].icon" />
              </q-avatar>

              <div class="ellipsis relative-position">
                {{ file.name }}
              </div>

              <q-tooltip>
                {{ file.name }}
              </q-tooltip>
            </q-chip>
          </template>
          </q-file>
         </div>
          <div class="column items-center justify-center" style="padding-top: 20px">
            <q-checkbox v-model="form.terminos" size="xs" label="Acepto Terminos y condiciones de uso" />
            <div class="text-negative text-h7" v-if="!terminos && aparecer"> Debe Aceptar los terminos </div>
          </div>
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 60px" @click="slide=2"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="text-h4" color="black" style="text-align: center">Datos de tienda</div>
          <div class="column items-center justify-center">
            <q-avatar square size="150px" style="margin-top: 20px;">
              <img :src="imgPerfil ? imgPerfil : 'noimg.png'">
              <q-file borderless v-model="perfilFile" class="absolute-center button-subir" @input="test" accept=".jpg, image/*" style="z-index:1">
                <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
              </q-file>
            </q-avatar>
            <div class="text-subtitle1">Carga tu foto de perfil</div>
          </div>
         <div style="text-align: left; padding-top: 20px">
           Nombre de tienda
           <q-input filled v-model="form2.nombre"  dense placeholder="Nombre comercial"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Correo de contacto tienda
           <q-input filled v-model="form2.correo"  dense placeholder="micorreo@petfriendly.com "/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Telefono de Contacto tienda
           <q-input type="tel" filled v-model="form2.telefono"  dense placeholder="+34543234"/>
         </div>
         <div style="text-align: left; padding-top: 20px; width: 100%;">
           Descripción
           <q-input type="textarea" filled v-model="form2.descripcion"/>
         </div>
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 60px" @click="slide=3"/>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="text-h4" color="black" style="text-align: center">Dirección del local</div>
         <q-img
          src="https://cdn.quasar.dev/img/image-src.png"
          style="height: 40%; width: 100%; margin-bottom: 20px; margin-top: 20px;"
        >
        </q-img>
         <div style="text-align: left; padding-top: 20px">
          País
          <q-select dense filled v-model="form2.pais" :options="paises" option-value="ciudades" option-label="name" label="Selecciona el país donde vas a trabajar"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
          Ciudad
          <q-select dense filled v-model="form2.region" :options="paises" option-value="ciudades" option-label="name" label="Selecciona la región donde vas a trabajar"/>
         </div>
         <div style="text-align: left; padding-top: 20px">
           Dirección
           <q-input filled v-model="form2.direccion"  dense placeholder="Escriba la dirección fisica de la tienda"/>
         </div>
         <div class="col row">
          <div style="text-align: left; padding-top: 20px" class="col-6">
            Horario de Apertura
          </div>
          <div style="text-align: left; padding-top: 20px" class="col-6">
            <q-input type="time" filled v-model="form2.hora_inicio"  dense/>
          </div>
         </div>
         <div class="col row">
          <div style="text-align: left; padding-top: 20px" class="col-6">
            Horario de cierre
          </div>
          <div style="text-align: left; padding-top: 20px" class="col-6">
            <q-input type="time" filled v-model="form2.hora_cierre" dense/>
          </div>
         </div>
          <div><q-checkbox v-model="form2.despachosReg" size="xs" label="Despachos a regiones" style="padding-top: 20px"/></div>
          <div><q-checkbox v-model="form2.delivery" size="xs" label="Delivery" style="padding-top: 20px"/></div>
          <div class="col row" style="padding-left: 50px; font-size: 9px">
            <div class="col-6">Valor del delivery</div>
            <div class="col-6"><q-input type="number" filled v-model="form2.deliveryM" prefix="$" dense placeholder="1000"/></div>
            <q-checkbox v-model="form2.deliveryG" size="xs" label="Delivery Gratis" style="padding-top: 20px"/>
          </div>
          <q-btn color="primary" label="Siguiente" style="width: 100%; margin-top: 20px; border-radius: 60px" @click="slide=4"/>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      form: {},
      form2: {},
      files: [],
      perfilFile: [],
      imgPerfil: '',
      paises: []
    }
  }
}
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: left
  padding-top: 30px
  padding-bottom: 30px
  padding-left: 10px
  color: white
  background-color: rgba(0, 0, 0, .3)
  margin-bottom: 40%
</style>
