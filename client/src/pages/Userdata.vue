<template>
  <div>
    <q-separator inset />
    <div class="row justify-center">
        <div v-if="datosusuario">
           <q-card class="bg-amber-1 q-pa-lg q-ma-md shadow-3">
                <div class="row justify-center items-center">
                        <div class="column">
                          <q-avatar size="180px">
                            <img  :src="baseu + 'perfil' + form._id">
                            <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
                              <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                            </q-file>
                          </q-avatar>
                        </div>

                    <div class="col-xs-12 col-sm-6 q-ma-sm col-md-6 col-lg-6">
                      <q-input v-model="password" label="Contraseña" outlined dense
                        error-message="Ingrese una contraseña válida, mínimo 6 caracteres"
                        :error="$v.password.$error" @blur="$v.password.$touch()" />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="repeatPassword" label="Repita su Contraseña" outlined dense
                        error-message="Las contraseñas deben ser iguales"
                        :error="$v.repeatPassword.$error"
                        @blur="$v.repeatPassword.$touch()"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.full_name" label="Nombre" outlined dense
                        error-message="Ingrese su nombre"
                        :error="$v.form.full_name.$error" @blur="$v.form.full_name.$touch()"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.last_name" label="Apellido" outlined dense
                        error-message="Ingrese su nombre"
                        :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-select v-model="form.country" label="País" outlined dense :options="['Colombia', 'Chile']" error-message="Ingrese su País" :error="$v.form.country.$error" @blur="$v.form.country.$touch()" />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <q-input :disable="form.country ? false : true" v-model="form.run_dni" :label="form.country === 'Chile' ? 'Ingrese RUN' : form.country === 'Colombia' ? 'Ingrese DNI' : 'Debes seleccionar un país'" outlined dense
                          error-message="Ingrese RUN O DNI"
                          :error="$v.form.run_dni.$error" @blur="$v.form.run_dni.$touch()"
                        />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.direccion" label="Dirección" outlined dense
                        error-message="Ingrese su Dirección"
                        :error="$v.form.direccion.$error" @blur="$v.form.direccion.$touch()"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                      <q-input v-model="form.phone" type="tel" label="Telefono" outlined dense
                        error-message="Ingrese el número de su Teléfono"
                        :error="$v.form.phone.$error" @blur="$v.form.phone.$touch()" />
                    </div>

                  </div>
            <div class="row justify-center q-pa-sm">
                  <q-btn color="primary" label="Guardar Cambios" @click="notifi = true, id = form._id , estatus = rol"/>
            </div>
          </q-card>
    </div>

    <div v-if="datosproveedor">
      <q-card class="q-pa-lg q-ma-md shadow-3">
          <div class="row justify-center items-center">
                  <div class="column">
                    <q-avatar size="180px">
                      <img  :src="baseu + form2._id">
                      <q-file borderless v-model="perfilFile" class="absolute-center button-camera" @input="perfil_img()" accept=".jpg, image/*" style="z-index:1">
                        <q-icon name="photo_camera" class="absolute-center" size="20px" color="white" />
                      </q-file>
                    </q-avatar>
                  </div>

              <q-card style="width: 100%" class="shadow-11 q-mt-md">
                <div class="q-mt-sm column">
                  <q-card flat class="q-pa-md shadow-up-3 q-mt-sm">
                        <q-scroll-area
                        horizontal
                        style="height: 110px;"
                      >
                        <div class="row no-wrap" style="width: 100%">
                          <q-card v-for="(item, index) in form2.tiendaFiles" class="bg-secondary q-mt-xs q-mr-sm" style="border-radius:12px;width: 100px" :key="index">
                            <q-img :src="form2.tiendaFiles ? baseu2 + item : 'noimgpro.png'" spinner-color="white" style="height: 100px; width: 100px" />
                              <q-btn icon="delete" style="position:absolute;top:0px;right:0px" flat round @click="eliminarimg = true, nameImgBorrar = item , estatus = rol" />
                          </q-card>
                        </div>
                      </q-scroll-area>
                    </q-card>

                  <div class="row justify-center items-center">
                    <div class="column">
                      <div class="column shadow-3 justify-center items-center q-ma-sm q-ml-sm" style="height:100px;border-radius:12px;width:140px">
                        <div class="text-center text-primary q-mb-sm" style="text-decoration: underline">Agregar Imagen</div>
                        <q-avatar size="50px">
                          <div style="z-index:1">
                            <q-file borderless v-model="tiendaFiles" class="button-camera" @input="addImg()" accept=".jpg, image/*">
                              <q-icon name="add" class="absolute-center" size="20px" color="white" />
                            </q-file>
                          </div>
                        </q-avatar>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 q-mt-md">
                <q-input v-model="password" label="Contraseña" outlined dense
                  error-message="Ingrese una contraseña válida, mínimo 6 caracteres"
                  :error="$v.password.$error" @blur="$v.password.$touch()" @input="cambioClave = true">
                  <template v-slot:before>
                    <q-icon name="vpn_key" color="primary" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <q-input v-model="repeatPassword" label="Repita su Contraseña" outlined dense
                  error-message="Las contraseñas deben ser iguales"
                  :error="$v.repeatPassword.$error"
                  @blur="$v.repeatPassword.$touch()">
                  <template v-slot:before>
                    <q-icon name="vpn_key" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <q-input v-model="form2.name" label="Ingrese el Nombre de la tienda" outlined dense
                  error-message="Ingrese el Nombre de la tienda"
                  :error="$v.form2.name.$error" @blur="$v.form.name.$touch()"
                  @input="cambioSoloClave = false">
                  <template v-slot:before>
                    <q-icon name="person" color="primary" />
                  </template>
                </q-input>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <q-select v-model="selectPais" label="País" outlined dense :options="paises" option-value="_id" option-label="pais" emit-value map-options error-message="Ingrese su País" :error="$v.selectPais.$error" @blur="$v.selectPais.$touch()" @input="cambioSoloClave = false, ciudad = ''">
                  <template v-slot:before>
                    <q-icon name="public" color="primary" />
                  </template>
                </q-select>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <q-select outlined dense v-model="ciudad" :options="optionCiudad" option-value="_id" option-label="ciudad" emit-value map-options error-message="Ingrese su Ciudad" :error="$v.ciudad.$error" @blur="$v.ciudad.$touch()" @input="cambioSoloClave = false">
                  <template v-slot:before>
                    <q-icon name="location_city" color="primary" />
                  </template>
                </q-select>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <q-input v-model="form2.dni" label="Numero indentificador de la empresa" outlined dense
                  error-message="Ingrese su Numero indentificador de la empresa"
                  :error="$v.form2.dni.$error" @blur="$v.form2.dni.$touch()"
                  @input="cambioSoloClave = false">
                  <template v-slot:before>
                    <q-icon name="payment" color="primary" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div class="q-pl-lg text-black text-caption"> servicios de la Tienda</div>
                <q-select
                  outlined
                  option-value="id"
                  option-label="name"
                  v-model="form2.servicios"
                  :options="servicios"
                  label="Selecciona las servicios"
                  multiple
                  @input="cambioSoloClave = false"
                  emit-value
                  map-options>
                      <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                        <q-item
                          v-bind="itemProps"
                          v-on="itemEvents"
                        >
                          <q-item-section>
                            <q-item-label v-html="opt.name" ></q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-checkbox :value="selected" @input="toggleOption(opt)" />
                          </q-item-section>
                        </q-item>
                      </template>
                    <template v-slot:before>
                      <q-icon name="design_services" color="primary" />
                    </template>
                  </q-select>
              </div>
            <div v-if="hoteleriacampo" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="q-pl-lg text-black text-caption"> País</div>
            <q-select outlined dense filled v-model="pais2" :options="paises" option-value="_id" option-label="pais" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false, ciudad2 = ''">
            <template v-slot:before>
              <q-icon name="public" color="primary" />
            </template>
          </q-select>
          <div class="q-pl-lg text-black text-caption"> ¿Donde daras Alojamiento?</div>
            <q-select outlined dense filled v-model="ciudad2" :options="optionCiudad2" option-value="_id" option-label="ciudad" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false">
            <template v-slot:before>
              <q-icon name="location_city" color="primary" />
            </template>
          </q-select>
          <div class="q-pl-lg text-black text-caption"> ¿A quien les ofreceras espacios?</div>
          <q-select outlined dense filled v-model="hoteleria.espacio" :options="espacio" option-value="label" option-label="label" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false">
            <template v-slot:before>
              <q-icon name="pets" color="primary" />
            </template>
          </q-select>
            <div class="q-pl-lg text-black text-caption"> Donde esta ubicado</div>
            <q-select outlined dense filled v-model="hoteleria.ubicacion" :options="ubicacion" option-value="label" option-label="label" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false">
            <template v-slot:before>
              <q-icon name="pets" color="primary" />
            </template>
          </q-select>
            <div class="q-pl-lg text-black text-caption"> ¿Esta pensado especialmente para tus hospedadores?</div>
            <q-select outlined dense filled v-model="hoteleria.pensado" :options="pensado" option-value="label" option-label="label" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false">
            <template v-slot:before>
              <q-icon name="pets" color="primary" />
            </template>
          </q-select>
            <div class="q-pl-lg text-black text-caption"> Presto servicios por parte de</div>
            <q-select outlined dense filled v-model="hoteleria.presto" :options="presto" option-value="label" option-label="label" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false">
            <template v-slot:before>
              <q-icon name="pets" color="primary" />
            </template>
          </q-select>
            <div class="q-pl-lg text-black text-caption"> Cantidad de huespedes</div>
            <q-input type="number" v-model="hoteleria.huespedes" dense outlined filled @input="cambiohotel = true, cambioSoloClave = false">
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg q-mt-md text-black text-caption"> donde esta tu alojamiento</div>
              <div class="q-pl-lg q-mt-sm text-black text-caption"> Direccion</div>
              <q-input v-model="hoteleria.alojamiento.direccion" dense outlined filled @input="cambiohotel = true, cambioSoloClave = false">
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Apartamento o numero</div>
              <q-input v-model="hoteleria.alojamiento.apartamento" dense outlined filled @input="cambiohotel = true, cambioSoloClave = false">
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Ciudad</div>
              <q-input class="q-mt-sm" v-model="hoteleria.alojamiento.ciudad" outlined filled dense @input="cambiohotel = true, cambioSoloClave = false">
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Estado</div>
              <q-input class="q-mt-sm" v-model="hoteleria.alojamiento.estado" outlined filled dense @input="cambiohotel = true, cambioSoloClave = false">
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Codigo postal</div>
              <q-input type="number" v-model="hoteleria.alojamiento.codigo" dense outlined filled @input="cambiohotel = true, cambioSoloClave = false">
                <template v-slot:before>
                  <q-icon name="pets" color="primary" />
                </template>
              </q-input>
              <div class="q-pl-lg text-black text-caption"> Servicios que ofrece</div>
              <q-select outlined dense filled multiple v-model="hoteleria.ofrece" :options="ofrece" option-value="label" option-label="label" emit-value map-options @input="cambiohotel = true, cambioSoloClave = false">
            <template v-slot:before>
              <q-icon name="pets" color="primary" />
            </template>
          </q-select>
            </div>
          </div>
          <div class="full-width q-mb-xl">
            <google-map :center="center" :zoom="10" @getBounds="getBounds" @newPlace="handleNewPlace" :withoutDirection="false" />
          </div>
        <div class="row justify-center q-pa-sm">
            <q-btn color="primary" label="Guardar Cambios" @click="notifi = true, id = form2._id , estatus = rol"/>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="notifi" >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="row justify-center text-center items-center">
            <div v-if="estatus === 3" class="text-h6">¡Atención!
              <div v-if="this.cambioSoloClave === false" class="text-caption row justify-center items-center">Ha modificado distintos campos por lo cual su cuenta entrará en estado de revisión hasta ser aprobada por el administrador.</div>
              <div v-if="this.cambioSoloClave === true" class="text-caption row justify-center items-center">¿Estas seguro de Actualizar los datos?</div>
            </div>
              <div v-if="estatus === 2" class="text-h6">¿Estas seguro de Actualizar los datos?</div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md row justify-center items-center">
          <q-btn v-if="estatus === 3" class="q-ma-sm" label="Actualizar" color="primary" @click="modificar_datosproveedor(), $router.go(-1)" push />
          <q-btn v-if="estatus === 2" class="q-ma-sm" label="Actualizar" color="primary" @click="modificar_datos(), $router.go(-1)" push />
          <q-btn class="q-ma-sm" label="Cerrar" color="grey" v-close-popup />
        </q-card-section>
      </q-card>
      </q-dialog>

      <q-dialog v-model="eliminarimg" >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="row justify-center text-center items-center">
            <div v-if="estatus === 3" class="text-h6">¡Atención!
              <div class="text-caption row justify-center items-center">¿Estas seguro de Borrar esta Imagen?</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md row justify-center items-center">
          <q-btn v-if="estatus === 3" class="q-ma-sm" label="Eliminar" color="primary" @click="deleteimg()" push v-close-popup />
          <q-btn class="q-ma-sm" label="Cerrar" color="grey" v-close-popup />
        </q-card-section>
      </q-card>
      </q-dialog>

    </div>
  </div>
</template>
<script>
import GoogleMap from '../components/GoogleMap'
import { required, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
import env from '../env'
export default {
  components: {
    GoogleMap
  },
  data () {
    return {
      center: { lat: -33.4504117, lng: -70.6707553 },
      paises: [],
      ciudad: '',
      servicios2: [],
      servicios: [],
      nameImgBorrar: '',
      datosusuario: false,
      datosproveedor: false,
      form: {},
      form2: {},
      repeatPassword: '',
      password: '',
      notifi: false,
      eliminarimg: false,
      perfilFile: null,
      imgPerfil: '',
      baseu: '',
      hoteleria: {},
      baseu2: '',
      usuario: {},
      rol: null,
      dias: [],
      tiendaFiles: [],
      selectPais: '',
      imgTienda: [],
      estatus: 8,
      var: false,
      id: '',
      ciudad2: '',
      pais2: '',
      cambioSoloClave: true,
      cambiohotel: false,
      cambioClave: false,
      espacio: [
        {
          label: 'Perros'
        },
        {
          label: 'Gatos'
        },
        {
          label: 'Ambos'
        }
      ],
      ofrece: [
        {
          label: 'Alimentacion'
        },
        {
          label: 'Paseo'
        },
        {
          label: 'Peluquero'
        }
      ],
      pensado: [
        {
          label: 'Si, solo esta habilitado para hospedaje'
        },
        {
          label: 'No, vivo yo o alguien en el espacio'
        }
      ],
      presto: [
        {
          label: 'Soy una persona natural'
        },
        {
          label: 'Soy una empresa'
        }
      ],
      ubicacion: [
        {
          label: 'Espacio compartido por Tipo: Tu mascota se alojara en un espacio compartido con otras mascotas de su mismo TIPO'
        },
        {
          label: 'Espacio compartido: Tu mascota se alojara en un espacio compartido con otros perros y gatos'
        },
        {
          label: 'Espacio Privado: Espacio habilitado para una sola mascota'
        }
      ]
    }
  },
  mounted () {
    this.getUser()
    this.obtenerDatos()
    this.getPaises()
    this.baseu = env.apiUrl + '/perfil_img/'
    this.baseu2 = env.apiUrl + '/tienda_img/'
    console.log(this.cambioSoloClave, 'cambio solo clave')
    console.log(this.cambioClave, 'cambio clave')
  },
  validations () {
    return {
      form: {
        name: { required, maxLength: maxLength(40) },
        country: { required },
        direccion: { required },
        dni: { required },
        phone: { required }
      },
      form2: {
        name: { required, maxLength: maxLength(40) },
        dni: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) },
      perfilFile: { required },
      ciudad: { required },
      selectPais: { required }
    }
  },
  computed: {
    hoteleriacampo () {
      const indexBuscar = this.form2.servicios.find(v => v === 1)
      if (indexBuscar === 1) {
        return true
      } else {
        return false
      }
    },
    optionCiudad () {
      const p = this.paises.find(v => v._id === this.selectPais)
      if (p) {
        return p.ciudades
      } else {
        return []
      }
    },
    optionCiudad2 () {
      const p = this.paises.find(v => v._id === this.pais2)
      if (p) {
        return p.ciudades
      } else {
        return []
      }
    }
  },
  methods: {
    async getUser () {
      await this.$api.get('user_info').then(v => {
        if (v) {
          this.rol = v.roles[0]
        }
        if (this.rol === 3) {
          this.datosproveedor = true
          this.form2 = v
          this.ciudad2 = this.form2.hoteleria.ciudad_id
          this.pais2 = this.form2.hoteleria.pais_id
          this.center = this.form2.ubicacion
          this.espejo = v
          this.selectPais = this.form2.pais_id
          this.ciudad = this.form2.ciudad_id
          if (this.hoteleriacampo) {
            this.hoteleria = this.form2.hoteleria
          } else {
            this.hoteleria = {
              alojamiento: {}
            }
          }

          console.log(this.form2, 'datos del usuario')
          console.log(this.hoteleria, 'datos hotel')
        }
        if (this.rol === 2) {
          this.form = v
          this.datosusuario = true
        }
      })
    },
    obtenerDatos () {
      this.$api.get('servicios').then(res => {
        if (res) {
          this.servicios = res
        }
      })
    },
    modificar_datos () {
      this.$v.form.$touch()
      console.log(this.form, 'pendiente')
      if (this.password) {
        if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
          this.form.password = this.password
          this.$api.put('datosnew/' + this.id, this.form).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Datos Modificados con exito',
                color: 'positive'
              })
            }
          })
        } else {
          this.$q.notify({
            message: 'las contraseñas no son iguales',
            color: 'negative'
          })
        }
      } else {
        if (!this.password) {
          if (!this.$v.form.$error) {
            this.$api.put('datosnew/' + this.id, this.form).then(res => {
              if (res) {
                this.$q.notify({
                  message: 'Datos Modificados con exito',
                  color: 'positive'
                })
              }
            })
          }
        }
      }
    },

    modificar_datosproveedor () {
      this.form2.pais_id = this.selectPais
      this.form2.ciudad_id = this.ciudad
      console.log(this.ciudad2, this.pais2, 'vwewewewewewe')
      if (this.hoteleriacampo) {
        this.form2.hoteleria = this.hoteleria
        this.form2.hoteleria.ciudad_id = this.ciudad2
        this.form2.hoteleria.pais_id = this.pais2
      } else {
        delete this.form2.hoteleria
      }
      this.form2.cambioClave = this.cambioClave
      this.form2.cambioSoloClave = this.cambioSoloClave
      this.form2.cambiohotel = this.cambiohotel
      console.log('datos nuevos', this.form2)
      this.$v.form2.$touch()
      if (this.password) {
        if (!this.$v.form2.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error) {
          this.form2.password = this.password
          this.$api.put('datosnew/' + this.id, this.form2).then(res => {
            if (res) {
              this.$q.notify({
                message: 'Datos Modificados con exito',
                color: 'positive'
              })
            }
          })
        } else {
          this.$q.notify({
            message: 'Verifica los datos',
            color: 'negative'
          })
        }
      } else {
        this.$v.form2.$touch()
        if (!this.password) {
          if (!this.$v.form2.$error) {
            this.$api.put('datosnew/' + this.id, this.form2).then(res => {
              console.log(res, 'resssss')
              if (res) {
                this.$q.notify({
                  message: 'Datos Modificados con exito',
                  color: 'positive'
                })
              }
            })
          } else {
            this.$q.notify({
              message: 'Verifica los datos',
              color: 'negative'
            })
          }
        }
      }
    },

    async addImg () {
      console.log('add img', this.tiendaFiles)
      if (this.form2.tiendaFiles.length >= 5) {
        this.$q.notify({
          message: 'no se pueden agregar mas imagenes',
          color: 'negative'
        })
      } else {
        if (this.tiendaFiles) {
          var formData = new FormData()
          var files = []
          files[0] = this.tiendaFiles
          formData.append('files', files[0])
          await this.$api.post('subir_archivo_proveedor', formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then((res) => {
            console.log(res, 'respuesta')
            this.form2.tiendaFiles = res.tiendaFiles
          })
        }
      }
    },

    async deleteimg () {
      console.log(this.nameImgBorrar, 'name eliminar')
      this.$api.get('eliminar_imagen_tienda/' + this.nameImgBorrar).then(res => {
        this.form2.tiendaFiles = res.tiendaFiles
      })
    },
    getBounds (bounds, center) {
      console.log(center, 'center')
    },
    handleNewPlace (place, coordinates) {
      console.log('handleNewPlace', coordinates, place, this.form, 'from')
      this.form2.ubicacion = coordinates
      this.form2.place = place
    },
    async perfil_img () {
      console.log('add perfil img', this.perfilFile)
      if (this.perfilFile) {
        var formData = new FormData()
        var files = []
        files[0] = this.perfilFile
        formData.append('files', files[0])
        await this.$api.post('perfil_imagen', formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then((res) => {
          console.log(res, 'respuesta')
          this.form2 = res
        })
        location.reload()
      }
    },
    async getPaises () {
      await this.$api.get('pais').then(res => {
        if (res) {
          this.paises = res
        }
      })
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
.button-camera {
  text-decoration: none;
  padding: 10px;
  font-weight: 540;
  font-size: 0px;
  color: white;
  background-color: $primary;
  border-radius: 30px;
  border: 1px solid #7e7e7e;
  height:40px;
  width:40px
}
</style>
