<template>
  <div>
    <h2>Renovar Usuario</h2>
    <div class="form-container">
      <input v-model="form.dni" placeholder="Cédula" type="number" />
      <input
        v-model="form.months"
        type="number"
        placeholder="Meses de Suscripción"
      />
      <button v-if="loading" @click="renewUser" class="btn btn-standar mt-4">
        RENOVAR
      </button>
      <div v-if="!loading" class="text-center mt-5">
        <b-spinner variant="warning" label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RenewUser',
  data() {
    return {
      form: {},
      loading: true,
    }
  },
  methods: {
    renewUser() {
      if (!this.form.dni || !this.form.months) {
        this.$snotify.error('Error, debes llenar todos los campos.')
      } else if (this.months > 100) {
        this.$snotify.error('Error, cantidad de meses demasiado grande.')
      } else {
        this.loading = false
        const data = {
          pay_months: parseInt(this.form.months),
        }
        axios
          .post(`http://localhost:3000/api/pay/months/${this.form.dni}`, data)
          .then((res) => {
            this.$snotify.success('Usuario renovado satisfactoriamente')
            setTimeout(() => {
              this.$router.go()
              this.loading = true
            }, 1000)
          })
          .catch(() => {
            this.$snotify.error('Error, no se pudo renovar el usuario')
            this.loading = true
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 30px;
}
.form-container {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  padding: 10px;
  input {
    font-family: 'Muli', sans-serif;
    text-align: center;
    color: white;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.253);
    margin-top: 10px;
    width: 60%;
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
