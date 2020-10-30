<template>
  <div>
    <h2>CONSULTAR USUARIO</h2>
    <form>
      <input v-model="form.dni" placeholder="Cédula" />

      <button @click="searchUser()" class="btn btn-standar mt-4">
        BUSCAR
      </button>
      <div v-if="!loading" class="text-center mt-5">
        <b-spinner variant="warning" label="Spinning"></b-spinner>
      </div>
    </form>

    <modal :width="900" :height="520" name="modal-user">
      <div class="container-modal">
        <h2>Datoss de usuario</h2>
        <p>{{ user.dni }}</p>
        <p>{{ user.name_user }}</p>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import { mixins } from '@/mixins'

export default {
  name: 'SearchUser',
  data() {
    return {
      form: {},
      user: {},
      loading: true,
    }
  },
  methods: {
    searchUser() {
      this.loading = false
      axios
        .get(`http://localhost:3000/api/user/${this.form.dni}`)
        .then((response) => {
          if (response.data.user.id_user) {
            this.$modal.show(`modal-user`)
            this.user = response.data.user
          } else {
            this.$snotify.error('No se encuentra el usuario')
          }
          this.loading = true
        })
        .catch((error) => {
          this.$snotify.error('Error al encontrar usuario')
          this.loading = true
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
