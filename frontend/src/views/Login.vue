<template>
  <div class="container-form">
    <form>
      <h1>JOSÉ SPORT GYM</h1>
      <input
        v-model="form.email"
        type="email"
        placeholder="Correo Electrónico"
      />
      <input v-model="form.password" type="password" placeholder="Contraseña" />

      <button @click="Login" class="btn btn-standar">INICIAR SESIÓN</button>
      <div v-if="!loading" class="text-center mt-5">
        <b-spinner variant="warning" label="Spinning"></b-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validateEmail } from '../utils/validations'
import router from '../router/index'

export default {
  name: 'Login',
  data() {
    return {
      form: {},
      loading: true,
    }
  },

  methods: {
    ...mapActions(['LOGIN']),
    Login() {
      this.loading = false
      if (validateEmail(this.form.email)) {
        this.LOGIN(this.form)
          .then((response) => {
            this.$router.replace({ name: 'Inventory' })
            this.loading = true
          })
          .catch((error) => {
            this.$snotify.error('Email o contraseña incorrectos')
            this.loading = true
          })
      } else {
        this.$snotify.error('Email no valido')
        this.loading = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';

.container-form {
  display: block;
  width: 100%;
  background-image: url('../assets/img/1.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  padding-top: 150px;
}
form {
  h1 {
    color: white;
    font-size: 2.5rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-bottom: 50px;
  }
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  width: 50%;
  padding: 40px;
  input {
    font-family: 'Muli', sans-serif;

    color: white;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.253);
    margin-top: 10px;
    width: 80%;
    display: block;
    margin-right: auto;
    margin-left: auto;
    font-size: 1.2rem;

    border: none;
  }
  input::placeholder {
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.9 !important;
    color: rgb(255, 255, 255);
  }
  button {
    margin-top: 20px;
  }
}
</style>
