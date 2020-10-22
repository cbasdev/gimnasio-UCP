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
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import router from '../router/index'
export default {
  name: 'Login',
  data() {
    return {
      form: {},
    }
  },

  methods: {
    ...mapActions(['LOGIN']),
    Login() {
      this.LOGIN(this.form)
        .then((response) => {
          this.$router.replace({ name: 'Inventory' })
        })
        .catch((error) => {
          this.$snotify.error('Email o contraseña incorrectos')
        })
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
