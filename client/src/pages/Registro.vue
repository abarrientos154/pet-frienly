<template>
  <q-tab-panels v-model="panel" animated>
    <q-tab-panel name="parte_uno" >
      <ParteUno :form="form" :panel="panelito" />
      <q-btn style="width: 100%" color="primary" push label="Volver" glossy @click="$router.push('/login')" />
    </q-tab-panel>
    <q-tab-panel name="parte_dos" >
      <div class="column">
        <ParteDos :form="form" :panel="panelito" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="parte_tres_proveedor_datos">
      <div class="column">
        <ParteTresProv :form="form" :panel="panelito" />
      </div>
    </q-tab-panel>
    <q-tab-panel name="parte_tres_cliente_datos">
      <div class="column">
        <ParteTresClient :form="form" :panel="panelito" />
      </div>
    </q-tab-panel>
    <!-- <q-tab-panel name="parte_cuatro_proveedor_planes">
      <div class="column">
        <ParteCuatro :form="form" :panel="panelito" />
      </div>
    </q-tab-panel> -->
  </q-tab-panels>
</template>

<script>
import ParteUno from '../components/Registro/ParteUno'
import ParteDos from '../components/Registro/ParteDos'
import ParteTresProv from '../components/Registro/ParteTresProveedor'
import ParteTresClient from '../components/Registro/ParteTresCliente'
/* import ParteCuatro from '../components/Registro/ParteCuatroProveedor' */
import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  components: {
    ParteUno, ParteDos, ParteTresProv, ParteTresClient
  },
  computed: {
    panel () {
      return this.panelito.panel
    }
  },
  data () {
    return {
      form: {},
      repeatPassword: '',
      password: '',
      options_roles: [
        { label: 'Proveedor', value: 3 },
        { label: 'Cliente', value: 2 }
      ],
      panelito: {
        panel: 'parte_uno'
      }
    }
  },
  validations () {
    return {
      form: {
        full_name: { required, maxLength: maxLength(40) },
        email: { required, email },
        roles: { required }
      },
      repeatPassword: { sameAsPassword: sameAs('password') },
      password: { required, maxLength: maxLength(256), minLength: minLength(6) }
    }
  }
}
</script>

<style>

</style>
