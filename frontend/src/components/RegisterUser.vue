<template>
  <div>
    <h2>Agregar Nuevo Usuario</h2>
    <div class="form-container">
      <input v-model="form.name_user" placeholder="Nombre" />
      <input v-model="form.dni" placeholder="Cédula" />
      <input
        v-model="form.acumulated_suscription"
        placeholder="Meses de Suscripción"
      />
      <button @click="addNewUser" class="btn btn-standar mt-4">
        AGREGAR
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { validateName, validateNumber } from '../utils/validations'
export default {
  name: 'RegisterUser',
  data() {
    return {
      form: {},
      dniSearch: '',
    }
  },
  methods: {
    addNewUser() {
      if (
        !this.form.name_user ||
        !this.form.dni ||
        !this.form.acumulated_suscription
      ) {
        this.$snotify.error('Error, debes llenar todos los campos.')
      } else if (!validateName(this.form.name_user)) {
        this.$snotify.error('El nombre ingresado no es válido.')
      } else if (!validateNumber(this.form.dni)) {
        this.$snotify.error('La cédula ingresada no es válida.')
      } else if (!validateNumber(this.form.acumulated_suscription)) {
        this.$snotify.error('Los méses ingresados no son válidos')
      } else {
        this.form.date_in = moment().format('DD/MM/YYYY')
        this.form.last_date_in = moment().format('DD/MM/YYYY')
        this.form.id_gym = 1
        axios
          .post('http://localhost:3000/api/user', this.form)
          .then(() => {
            this.$snotify.success('Usuario registrado satisfactoriamente')
            this.$router.go()
          })
          .catch((error) => {
            console.log(error)
            this.$snotify.error('El usuario ya existe')
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-container {
  h2 {
    color: white;
    font-size: 2.5rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-bottom: 50px;
  }
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  padding: 40px;
  input {
    font-family: 'Muli', sans-serif;

    color: white;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.253);
    margin-top: 10px;
    width: 100%;
    display: block;
    margin-right: auto;
    margin-left: auto;
    border: none;
    font-size: 1.2rem;
  }
  input::placeholder {
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.9 !important;
    color: rgb(255, 255, 255);
  }
}
</style>
