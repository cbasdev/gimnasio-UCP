<template>
  <div>
    <h2>Renovar Usuario</h2>
    <form>
      <input v-model="form.dni" placeholder="Cédula" type="number" />
      <input
        v-model="form.months"
        type="number"
        placeholder="Meses de Suscripción"
      />
      <button @click="renewUser" class="btn btn-standar mt-4">
        RENOVAR
      </button>
    </form>
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
            console.log(res)
            this.$router.go()
            this.$snotify.success('Usuario renovado satisfactoriamente')
            this.loading = true
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
