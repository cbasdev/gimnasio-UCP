<template>
  <div>
    <h2>CONSULTAR USUARIO</h2>
    <div class="form-container">
      <input v-model="form.dni" placeholder="Cédula" />

      <button @click="searchUser()" class="btn btn-standar mt-4">
        BUSCAR
      </button>
      <div v-if="!loading" class="text-center mt-5">
        <b-spinner variant="warning" label="Spinning"></b-spinner>
      </div>
    </div>

    <modal :width="700" :height="520" name="modal-user">
      <div class="container-modal">
        <h3>Datos de usuario</h3>

        <div class="d-flex justify-content-between mt-4">
          <div class="line">
            Cédula:
          </div>
          <p>{{ user.dni }}</p>
        </div>

        <div class="d-flex justify-content-between">
          <div class="line">
            Nombre:
          </div>
          <p>{{ user.name_user }}</p>
        </div>

        <div class="d-flex justify-content-between">
          <div class="line">
            Primera Suscripción:
          </div>
          <p>{{ user.date_in }}</p>
        </div>

        <div class="d-flex justify-content-between">
          <div class="line">
            Última Suscripción:
          </div>
          <p>{{ user.last_date_in }}</p>
        </div>

        <div class="d-flex justify-content-between">
          <div class="line">
            Meses de Suscripción:
          </div>
          <p>{{ user.acumulated_suscription }}</p>
        </div>

        <div class="d-flex justify-content-between">
          <div class="line">
            Estado:
          </div>
          <p v-bind:class="isActive ? 'text-green' : 'text-red'">
            {{ state }}
          </p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import { mixins } from '@/mixins'

export default {
  mixins: [mixins],
  name: 'SearchUser',
  data() {
    return {
      form: {},
      user: {},
      loading: true,
      state: 'Activa',
    }
  },
  computed: {
    isActive() {
      return this.state === 'Activo'
    },
  },
  methods: {
    searchUser() {
      this.loading = false
      axios
        .get(`http://localhost:3000/api/user/${this.form.dni}`)
        .then((response) => {
          if (response.data.user.id_user) {
            this.user = response.data.user

            this.state = this.getStateSuscription(
              this.user.last_date_in,
              this.user.acumulated_suscription
            )

            this.$modal.show(`modal-user`)
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
@import '../assets/theme.scss';
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
.container-modal {
  h3 {
    color: $principal-color;
    font-size: 3.4rem;
  }
  padding: 50px;
  font-size: 1.8rem;
  .d-flex {
    padding: 0 20px 0 20px;
  }
  .line {
    font-weight: 800;
    display: inline;
  }
  .text-green {
    color: $principal-color;
  }
  .text-red {
    color: $secundary-color;
  }
}
</style>
