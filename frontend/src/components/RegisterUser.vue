<template>
  <div>
    <h2>Agregar Nuevo Usuario</h2>
    <form>
      <input v-model="form.name_user" placeholder="Nombre" />
      <input v-model="form.dni" placeholder="Cédula" />
      <input
        v-model="form.acumulated_suscription"
        placeholder="Meses de Suscripción"
      />
      <button @click="addNewUser" class="btn btn-standar mt-4">
        AGREGAR
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'RegisterUser',
  data() {
    return {
      form: {},
      dniSearch: '',
    }
  },
  methods: {
    ...mapActions(['ADD_USER']),
    addNewUser() {
      this.form.date_in = moment().format('DD/MM/YYYY')
      this.form.last_date_in = moment().format('DD/MM/YYYY')
      this.form.id_gym = 1
      this.ADD_USER(this.form)
        .then(() => {
          this.$snotify.success('Usuario registrado satisfactoriamente')
          this.$emit('reload')
        })
        .catch((error) => {
          this.$snotify.error('Error al registrar usuario', error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
form {
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
