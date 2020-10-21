<template>
  <div class="container-form">
    <form>
      <h2>JOSÉ SPORT GYM</h2>
      <input v-model="form.name_admin" type="text" placeholder="Nombre" />
      <input
        v-model="form.email"
        type="email"
        placeholder="Correo Electrónico"
      />
      <input v-model="form.password" type="password" placeholder="Contraseña" />
      <input
        v-model="repeatPass"
        type="password"
        placeholder="Repetir Contraseña"
      />
      <input v-model="code" type="password" placeholder="Código Interno" />
      <button class="btn" @click="Register">Registrarse</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      form: {},
      repeatPass: '',
      code: '',
    }
  },
  methods: {
    ...mapActions(['REGISTER']),
    Register() {
      this.form.id_gym = 1
      this.REGISTER(this.form)
        .then((response) => {
          this.$snotify.success('Usuario registrado satisfactoriamente')
          this.$router.replace({ name: 'Inventory' })
        })
        .catch((error) => {
          this.$snotify.error('Usuario ya existente')
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
    border: none;
  }
  input::placeholder {
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.9 !important;
    color: rgb(255, 255, 255);
  }
  button {
    text-transform: uppercase;
    color: $dark-color;
    letter-spacing: 5px;
    font-family: 'Muli', sans-serif;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: 1000;
    width: 80%;
    margin-top: 30px;
    padding: 10px;
    background-color: $principal-color;
  }
}
</style>
