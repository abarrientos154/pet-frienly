<template>
  <div>
    <q-carousel class="window-height" animated v-model="slide" infinite ref="carousel">
      <q-carousel-slide :name="1" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="primary" icon="arrow_back" @click="$router.go(-1)"/>
          <div class="q-mb-lg text-center text-h5 text-grey-6">Datos del Aliado</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 200px; width: 200px; border-radius: 25px;" class="bg-grey">
              <q-img style="height: 100%;" :src="representImg != '' ? representImg : ''">
                <q-file  borderless v-model="img" class="button-camera" @input="represent_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%; font-size: 0px">
                  <div class="absolute-center row justify-center" style="width:100%">
                    <q-icon name="cloud_upload" size="75px" color="white" />
                    <div class="col-12 text-center text-white" style="font-size: 14px">Toca para subir una selfie</div>
                  </div>
                </q-file>
              </q-img>
            </q-avatar>
            <div class="text-negative" v-if="$v.RLImg.$error"> La imagen es Requerida </div>
          </div>

          <div class="q-mb-xl">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-caption">Nombre</div>
                <q-input filled v-model="form.name"  dense placeholder="Nombre del representante legal" error-message="Este campo es requerido" :error="$v.form.name.$error" @blur="$v.form.name.$touch()"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-caption">Apellidos</div>
                <q-input filled v-model="form.last_name"  dense placeholder="Coloca ambos apellidos"  error-message="Este campo es requerido" :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"/>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-caption">Fecha de nacimiento</div>
                <q-input filled readonly dense v-model="form.birth" placeholder="dd/mm/aaaa" @click="$refs.qDateProxy.show()"
                error-message="Este campo es requerido" :error="$v.form.birth.$error" @blur="$v.form.birth.$touch()">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.birth" mask="DD/MM/YYYY">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-caption">Telefono de contacto</div>
                <q-input filled v-model="form.phone"  dense placeholder="+5695331583" error-message="Este campo es requerido" :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()"/>
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div class="text-caption">Correo de contacto</div>
              <q-input filled v-model="form.email"  dense placeholder="micorreo@email.com" error-message="Este campo es requerido" :error="$v.form.email.$error" @blur="$v.form.email.$touch()"/>
            </div>
            <div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-caption">Contraseña</div>
                <q-input :type="ver ? 'text' : 'password'" v-model="password" placeholder="Contraseña" outlined dense filled error-message="Ingrese una contraseña válida, mínimo 6 caracteres" :error="$v.password.$error" @blur="$v.password.$touch()">
                  <template v-slot:append>
                    <q-icon :name="ver ? 'visibility_off' : 'visibility'" class="cursor-pointer q-pa-sm" color="primary" @click="ver = !ver" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="text-caption">Repite Contraseña</div>
                <q-input :type="ver ? 'text' : 'password'" v-model="repeatPassword" placeholder="Repita su Contraseña" outlined dense filled error-message="Las contraseñas deben ser iguales" :error="$v.repeatPassword.$error" @blur="$v.repeatPassword.$touch()"/>
              </div>
            </div>
            <div>
              <div class="text-caption q-pb-sm text-bold">Imágenes de documento de identificación</div>
              <div class="row q-gutter-sm q-mb-sm">
                <div class="col-7">
                  <div class="text-caption">Carga la parte frontal de tu documento de identidad</div>
                  <q-avatar rounded style="height: 50px; width: 100%;" class="bg-primary">
                    <q-file  borderless :disable="IImg.length < 1 ? false : true" v-model="img" class="button-camera" @input="identificacion_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;">
                      <div class="absolute-center text-center text-white full-width text-subtitle1">Cargar imagen</div>
                    </q-file>
                  </q-avatar>
                  <q-avatar class="bg-grey q-mt-sm" rounded style="height: 50px; width: 100%">
                    <q-img style="height: 100%;" :src="identificacionImg.length ? identificacionImg[0] : ''"/>
                    <div class="absolute-center text-center text-negative full-width text-subtitle1" v-if="$v.IImg.$error">Imagen requerida</div>
                  </q-avatar>
                </div>
                <div class="col-7">
                  <div class="text-caption">Carga la parte trasera de tu documento de identidad</div>
                  <q-avatar rounded style="height: 50px; width: 100%;" class="bg-primary">
                    <q-file  borderless :disable="IImg.length > 1 || IImg.length < 1 ? true : false" v-model="img" class="button-camera" @input="identificacion_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;">
                      <div class="absolute-center text-center text-white full-width text-subtitle1">Cargar imagen</div>
                    </q-file>
                  </q-avatar>
                  <q-avatar class="bg-grey q-mt-sm" rounded style="height: 50px; width: 100%">
                    <q-img style="height: 100%;" :src="identificacionImg.length > 1 ? identificacionImg[1] : ''"/>
                    <div class="absolute-center text-center text-negative full-width text-subtitle1" v-if="$v.IImg.$error">Imagen requerida</div>
                  </q-avatar>
                </div>
              </div>
            </div>
          </div>

          <div class="column items-center">
            <div class="column items-center q-mb-lg">
              <q-checkbox v-model="terminos" size="xs" label="Acepto Terminos y condiciones de uso" />
              <div class="text-negative" v-if="!terminos && aparecer"> Debe Aceptar los terminos </div>
            </div>
            <q-btn rounded class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%;" @click="siguiente()" no-caps/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="primary" icon="arrow_back" @click="slide = 1"/>
          <div class="q-mb-lg text-center text-h5 text-grey-6">Datos de espacios</div>

          <div class="column items-center q-mb-lg">
            <q-avatar rounded style="height: 150px; width: 200px;" class="bg-grey q-mb-sm">
              <q-img style="height: 100%;" :src="perfilImg != '' ? perfilImg : ''">
                <q-file  borderless v-model="img" class="button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;">
                  <q-icon name="backup" class="absolute-center" size="50px" color="white" />
                </q-file>
              </q-img>
            </q-avatar>
            <div :class="$v.PImg.$error ? 'text-negative' : ''">{{$v.PImg.$error ? 'La imagen es Requerida' : 'Carga tu foto de perfil'}}</div>
          </div>

          <div class="q-mb-lg">
            <div>
              <div class="text-caption">Nombre de espacios</div>
              <q-input  v-model="formMySpace.name" placeholder="Nombré comercial" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.name.$error" @blur="$v.formMySpace.name.$touch()"/>
            </div>
            <div>
              <div class="text-caption">Correo de contacto tienda</div>
              <q-input  v-model="formMySpace.email" placeholder="micorreo@email.com" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.email.$error" @blur="$v.formMySpace.email.$touch()"/>
            </div>
            <div>
              <div class="text-caption">Telefono de contacto tienda</div>
              <q-input  v-model="formMySpace.phone" placeholder="+5695331583" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.name.$phone" @blur="$v.formMySpace.phone.$touch()"/>
            </div>
            <div class="q-mt-md">
              <div class="text-caption">Descripción</div>
              <q-input filled outlined placeholder="Mi espacio es..." v-model="formMySpace.description" type="textarea" error-message="Este campo es requerido" :error="$v.formMySpace.description.$error" @blur="$v.formMySpace.description.$touch()"/>
            </div>
          </div>

          <div class="column items-center">
            <q-btn rounded class="q-pa-sm" color="primary" label="Siguiente" style="width: 70%;" @click="siguiente()" no-caps/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="q-pa-none">
        <div class="q-pa-lg">
          <q-btn flat round color="primary" icon="arrow_back" @click="slide = 2"/>
          <div class="q-mb-lg text-center text-h5 text-grey-6">Datos de espacios</div>

          <q-avatar rounded style="height: 250px; width: 100%;" class="q-mb-sm">
            <q-img style="height: 100%;" :src="perfilImg != '' ? perfilImg : ''">
              <q-icon name="image" class="absolute-center" size="50px" color="white" />
            </q-img>
          </q-avatar>

          <div>
            <div>
              <div class="text-caption">País</div>
              <q-select outlined dense filled placeholder="Selecciona el país donde vas a trabajar" v-model="selectPais" :options="paises" @input="formMySpace.pais_id = selectPais._id, ciudades = selectPais.ciudades, selectCiudad = null" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectPais.$error" @blur="$v.selectPais.$touch()"/>
            </div>
            <div>
              <div class="text-caption">Ciudad</div>
              <q-select outlined dense filled placeholder="Seleccione la región a la que pertenece" v-model="selectCiudad" :options="ciudades" @input="formMySpace.ciudad_id = selectCiudad._id" option-label="name" map-options error-message="Este campo es requerido" :error="$v.selectCiudad.$error" @blur="$v.selectCiudad.$touch()"/>
            </div>
            <div>
              <div class="text-caption">Dirección</div>
              <q-input  v-model="formMySpace.direction" placeholder="Escriba la direccion fisica del espacio" outlined dense filled error-message="Este campo es requerido" :error="$v.formMySpace.direction.$error" @blur="$v.formMySpace.direction.$touch()"/>
            </div>
          </div>

          <div>
            <div class="row items-center q-mb-md">
              <div class="text-subtitle1 col">Horario de apertura</div>
              <div class="col column">
                <q-input filled dense readonly v-model="formMySpace.hora_inicio" placeholder="--:--" @click="$refs.qTimeProxy1.show()"
                error-message="Este campo es requerido" :error="$v.formMySpace.hora_inicio.$error" @blur="$v.formMySpace.hora_inicio.$touch()">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy ref="qTimeProxy1" transition-show="scale" transition-hide="scale">
                        <q-time v-model="formMySpace.hora_inicio">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row items-center q-mb-md">
              <div class="text-subtitle1 col">Horario de cierre</div>
              <div class="col column">
                <q-input filled dense readonly v-model="formMySpace.hora_cierre" placeholder="--:--" @click="$refs.qTimeProxy2.show()"
                error-message="Este campo es requerido" :error="$v.formMySpace.hora_cierre.$error" @blur="$v.formMySpace.hora_cierre.$touch()">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy ref="qTimeProxy2" transition-show="scale" transition-hide="scale">
                        <q-time v-model="formMySpace.hora_cierre">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="column items-center">
            <q-btn rounded class="q-pa-sm" color="primary" label="Registrar" style="width: 70%;" @click="registrarse()" no-caps/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="4" class="q-pa-none">
        <div class="absolute-center full-width column justify-between">
          <div class="q-pb-xl">
            <div class="row justify-center q-pb-lg">
              <img src="logo.png" style="width:260px" />
            </div>
            <div class="text-h5 text-bold text-center text-grey-9">¿Te gustaria agregar un espacio de descanso?</div>
            <div class="text-caption text-center q-px-lg q-pt-md">Toca la pantalla y agrega los alojamientos que quieres arrendar</div>
          </div>

          <div class="q-pt-xl column items-center q-gutter-sm">
            <q-btn no-caps rounded class="q-py-xs" color="primary" label="Nuevo" style="width: 60%"
              @click="slide = 5"/>
            <q-btn no-caps flat class="q-my-xs" color="primary" label="Omitir para ir a tu espacio" style="width: 60%"
              @click="$router.push('/inicio_hospedador')"/>
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="5" class="q-pa-none">
        <div class="q-pa-lg">
          <div class="q-pb-lg text-center text-h5 text-grey-6">Nueva habitación</div>

          <div class="q-pa-md">
            <div class="text-subtitle1">Carga las fotos de tu espacio de descanso</div>
            <div :class="$v.espacioImg.$error ? 'text-caption text-italic text-negative' : 'text-caption text-grey-10 text-italic'">{{$v.espacioImg.$error ? 'Debes cargar minimo una foto' : 'Puedes cargar hasta 3 fotos'}}</div>
            <div class="row">
              <q-avatar rounded style="height: 100px; width: 100px; border-radius: 15px;" class="bg-grey q-my-xs q-mr-xs">
                <q-file  borderless :disable="espacioImg.length < 3 ? false : true" v-model="img" class="button-camera" @input="espacio_img()" accept=".jpg, image/*" style="z-index:1; width: 100%; height: 100%;"/>
                <q-icon name="backup" class="absolute-center" size="50px" color="white" />
              </q-avatar>
              <q-scroll-area horizontal class="col" style="height: 110px;">
                <div class="row no-wrap" style="width: 100%;">
                  <q-avatar class="q-ma-xs" rounded v-for="(item, index) in mostrarImg" :key="index" style="height: 100px; width: 100px; border-radius: 15px;">
                    <q-img style="height: 100%;" :src="item">
                      <q-btn @click="borrarImg(index, 1)" flat class="absolute all-pointer-events" size="15px" dense icon="clear" color="negative" style="top: 0px; right: 0px" rounded />
                    </q-img>
                  </q-avatar>
                </div>
              </q-scroll-area>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
              <div class="text-subtitle1 text-bold">Nombre para tu espacio</div>
              <div class="text-caption text-grey-10 text-italic">Solo 25 caracteres</div>
              <q-input dense filled v-model="formEspacio.name" placeholder="Nombre espacio" error-message="Este campo es requerido" :error="$v.formEspacio.name.$error" @blur="$v.formEspacio.name.$touch()"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
              <div class="text-subtitle1 text-bold">¿Para quien estará disponible tu espacio?</div>
              <div class="text-caption text-grey-10 text-italic">Escoger perro, gato o ambos</div>
              <q-select dense filled option-value="name" option-label="name" v-model="formEspacio.pet_type" :options="mascotas" placeholder="tipos de mascotas" emit-value map-options error-message="Este campo es requerido" :error="$v.formEspacio.pet_type.$error" @blur="$v.formEspacio.pet_type.$touch()"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
              <div class="text-subtitle1 text-bold">Tamaño de las mascotas que recibes</div>
              <q-select dense filled placeholder="Tamaños" v-model="formEspacio.petSize" :options="['Pequeño', 'Mediano', 'Grande']" error-message="Este campo es requerido" :error="$v.formEspacio.petSize.$error" @blur="$v.formEspacio.petSize.$touch()"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
              <div class="text-subtitle1 text-bold">Selecciona los servicios que incluye</div>
              <q-select dense filled option-value="name" option-label="name" v-model="servicios2" :options="servicios" @input="formEspacio.services = servicios2" placeholder="Servicios" multiple emit-value map-options error-message="Este campo es requerido" :error="$v.formEspacio.services.$error" @blur="$v.formEspacio.services.$touch()">
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps" v-on="itemEvents">
                    <q-item-section>
                      <q-item-label v-html="opt.name" ></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox :value="selected" @input="toggleOption(opt)" />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
              <div class="text-subtitle1 text-bold">Tipo de espacio</div>
              <q-select dense filled placeholder="" option-value="name" option-label="name" v-model="formEspacio.location" :options="location" emit-value map-options error-message="Este campo es requerido" :error="$v.formEspacio.location.$error" @blur="$v.formEspacio.location.$touch()"/>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-mb-md">
              <div class="text-subtitle1 text-bold">Estado del espacio</div>
              <q-select dense filled placeholder="" option-value="name" option-label="name" v-model="formEspacio.state" :options="state" emit-value map-options error-message="Este campo es requerido" :error="$v.formEspacio.state.$error" @blur="$v.formEspacio.state.$touch()"/>
            </div>
          </div>

          <div>
            <div class="text-subtitle1 text-bold">Descripción del espacio</div>
            <div class="text-caption text-grey-10 text-italic">Solo 80 caracteres</div>
            <q-input filled outlined placeholder="Mi espacio es..." v-model="formEspacio.description" type="textarea" error-message="Este campo es requerido" :error="$v.formEspacio.description.$error" @blur="$v.formEspacio.description.$touch()"/>
          </div>

          <div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold col">Valor por noche</div>
              <div class=" col column">
                <div class="text-caption text-grey-10 text-italic" style="font-size: 11px">Ingresa el costo por noche</div>
                <q-input prefix="$" filled color="primary" v-model.number="formEspacio.price" type="number" dense :rules="[val => val > 0]" min="0" error-message="Este campo es requerido" :error="$v.formEspacio.price.$error" @blur="$v.formEspacio.price.$touch()"/>
              </div>
            </div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold col">Cantidad de huéspedes</div>
              <div class=" col column">
                <div class="text-caption text-grey-10 text-italic" style="font-size: 11px">Cantidad de huéspedes</div>
                <q-input filled color="primary" v-model.number="formEspacio.guests" type="number" dense :rules="[val => val > 0]" min="0" error-message="Este campo es requerido" :error="$v.formEspacio.guests.$error" @blur="$v.formEspacio.guests.$touch()"/>
              </div>
            </div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold col">Metros cuadrados</div>
              <div class=" col column">
                <div class="text-caption text-grey-10 text-italic" style="font-size: 11px">Cantidad de metros cuadrados</div>
                <q-input filled color="primary" v-model.number="formEspacio.dimensions" type="number" dense :rules="[val => val > 0]" min="0" error-message="Este campo es requerido" :error="$v.formEspacio.dimensions.$error" @blur="$v.formEspacio.dimensions.$touch()"/>
              </div>
            </div>
            <div class="row items-center">
              <div class="text-subtitle1 text-bold col"> El espacio es parte de un(a)</div>
              <div class=" col column">
                <div class="text-caption text-grey-10 text-italic" style="font-size: 11px">Seleccione el tipo de espacio</div>
                <q-select dense filled option-value="enable" option-label="name" v-model="formEspacio.only_pets" :options="only_pets" emit-value map-options error-message="Este campo es requerido" :error="$v.formEspacio.only_pets.$error" @blur="$v.formEspacio.only_pets.$touch()"/>
              </div>
            </div>
          </div>
          <div class="column items-center q-mt-xl">
            <q-btn color="primary" class="q-pa-xs" label="Guardar" style="width: 60%; border-radius: 4px" @click="guardar()" no-caps/>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      terminos: false,
      aparecer: false,
      ver: false,
      selectPais: null,
      selectCiudad: null,
      img: null,
      slide: 1,
      password: '',
      repeatPassword: '',
      representImg: '',
      perfilImg: '',
      form: {},
      formMySpace: {},
      formEspacio: {},
      RLImg: {},
      PImg: {},
      identificacionImg: [],
      IImg: [],
      paises: [],
      ciudades: [],
      espacioImg: [],
      mostrarImg: [],
      servicios: [{ name: 'Paseo de mascota' }],
      servicios2: [],
      mascotas: [{ name: 'Perros' }, { name: 'Gatos' }, { name: 'Ambos' }],
      location: [{ name: 'Espacio compartido', description: 'Tu mascota se aloja en un espacio compartido con otros perros y gatos' }, { name: 'Espacio privado', description: 'Espacio habilitado para una sola mascota' }],
      state: [{ name: 'Disponible' }, { name: 'Ocupado' }, { name: 'Mantención' }],
      only_pets: [{ name: 'Hotel para mascotas' }, { name: 'Persona natural' }]
    }
  },
  validations: {
    form: {
      name: { required },
      last_name: { required },
      birth: { required },
      phone: { required },
      email: { required, email }
    },
    formMySpace: {
      name: { required },
      email: { required, email },
      phone: { required },
      description: { required },
      direction: { required },
      hora_inicio: { required },
      hora_cierre: { required }
    },
    selectPais: { required },
    selectCiudad: { required },
    formEspacio: {
      name: { required, maxLength: maxLength(25) },
      pet_type: { required },
      petSize: { required },
      services: { required },
      description: { required, maxLength: maxLength(80) },
      price: { required },
      guests: { required },
      dimensions: { required },
      only_pets: { required },
      location: { required },
      state: { required }
    },
    espacioImg: { required, minLength: minLength(1) },
    RLImg: { required },
    IImg: { required, minLength: minLength(2) },
    PImg: { required },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    repeatPassword: { sameAsPassword: sameAs('password') }
  },
  mounted () {
    this.getPaises()
  },
  methods: {
    ...mapMutations('generals', ['login']),
    getPaises () {
      this.$api.get('pais').then(res => {
        if (res) {
          this.paises = res
        }
      })
    },
    siguiente () {
      if (this.slide === 1) {
        this.$v.RLImg.$touch()
        this.$v.IImg.$touch()
        this.$v.form.$touch()
        this.$v.password.$touch()
        this.$v.repeatPassword.$touch()
        if (!this.$v.RLImg.$error && !this.$v.IImg.$error && !this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && this.terminos) {
          this.slide = 2
        } else {
          this.$q.notify({
            message: 'Debe ingresar todos los datos correspondientes para continuar',
            color: 'negative'
          })
          this.aparecer = true
        }
      } else if (this.slide === 2) {
        this.$v.PImg.$touch()
        this.$v.formMySpace.name.$touch()
        this.$v.formMySpace.email.$touch()
        this.$v.formMySpace.phone.$touch()
        this.$v.formMySpace.description.$touch()
        if (!this.$v.PImg.$error && !this.$v.formMySpace.name.$error && !this.$v.formMySpace.email.$error && !this.$v.formMySpace.phone.$error && !this.$v.formMySpace.description.$error) {
          this.slide = 3
        } else {
          this.$q.notify({
            message: 'Debe ingresar todos los datos correspondientes para continuar',
            color: 'negative'
          })
        }
      }
    },
    represent_img () {
      this.RLImg = this.img
      this.representImg = URL.createObjectURL(this.img)
      this.img = null
    },
    perfil_img () {
      this.PImg = this.img
      this.perfilImg = URL.createObjectURL(this.img)
      this.img = null
    },
    identificacion_img () {
      this.IImg.push(this.img)
      this.identificacionImg.push(URL.createObjectURL(this.img))
      this.img = null
    },
    espacio_img () {
      this.espacioImg.push(this.img)
      this.mostrarImg.push(URL.createObjectURL(this.img))
      this.img = null
    },
    borrarImg (index, val) {
      this.espacioImg.splice(index, val)
      this.mostrarImg.splice(index, val)
    },
    registrarse () {
      this.$v.RLImg.$touch()
      this.$v.IImg.$touch()
      this.$v.form.$touch()
      this.$v.password.$touch()
      this.$v.repeatPassword.$touch()
      this.$v.PImg.$touch()
      this.$v.selectPais.$touch()
      this.$v.selectCiudad.$touch()
      this.$v.formMySpace.$touch()
      if (!this.$v.form.$error && !this.$v.formMySpace.$error && !this.$v.selectPais.$error && !this.$v.selectCiudad.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.RLImg.$error && !this.$v.PImg.$error && this.terminos) {
        this.$q.loading.show({
          message: 'Registrando...'
        })
        this.form.my_space = this.formMySpace
        this.form.password = this.password
        var formData = new FormData()
        var files = []
        var files2 = []
        files[0] = this.RLImg
        files2[0] = this.PImg
        for (let i = 0; i < this.IImg.length; i++) {
          formData.append('IFiles' + i, this.IImg[i])
        }
        formData.append('RLFiles', files[0])
        formData.append('PFiles', files2[0])
        formData.append('dat', JSON.stringify(this.form))
        this.$api.post('register_hospedador', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Ya formas parte de PeT, Bienvenido',
              color: 'positive'
            })
            this.loguear()
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
        this.aparecer = true
      }
    },
    loguear () {
      this.$api.post('login', this.form).then(res => {
        if (res) { // Se debe ejecutar una mutacion que modifique el state con sessionInfo
          const user = res.TRI_SESSION_INFO.roles[0]
          if (user === 4) {
            this.login(res)
            this.slide = 4
          }
        } else {
          console.log('error de ususario')
          // this.loading = false
        }
      })
    },
    guardar () {
      this.$v.$touch()
      if (!this.$v.espacioImg.$error && !this.$v.formEspacio.$error) {
        this.$q.loading.show({
          message: 'Subiendo Espacio de Descanso, Por Favor Espere...'
        })
        var formData = new FormData()
        var cantidadArchivos = this.espacioImg.length
        for (const j in this.espacioImg) {
          formData.append('files_' + j, this.espacioImg[j])
        }
        this.formEspacio.cantidadArchivos = cantidadArchivos
        formData.append('dat', JSON.stringify(this.formEspacio))
        this.$api.post('hospedaje', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          if (res) {
            this.$q.notify({
              message: 'Espacio de Descanso agregado con exito',
              color: 'positive'
            })
            this.slide = 4
            this.formEspacio = {}
            this.espacioImg = []
            this.mostrarImg = []
            this.mascotas2 = []
            this.servicios2 = []
          }
          this.$q.loading.hide()
        })
      } else {
        this.$q.notify({
          message: 'Debe ingresar todos los datos correspondientes',
          color: 'negative'
        })
      }
    }
  }
}
</script>
