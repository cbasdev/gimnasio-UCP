<template>
  <div class="container-form">
    <form>
      <h1>JOSÉ SPORT GYM</h1>
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
      <button class="btn btn-standar" @click="Register">Registrarse</button>
      <div v-if="!loading" class="text-center mt-5">
        <b-spinner variant="warning" label="Spinning"></b-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validateEmail } from '../utils/validations'
export default {
  name: 'Register',
  data() {
    return {
      form: {},
      repeatPass: '',
      code: '',
      loading: true,
    }
  },
  methods: {
    ...mapActions(['REGISTER']),
    Register() {
      this.loading = false

      if (
        !this.form.name_admin ||
        !this.form.email ||
        !this.form.password ||
        this.repeatPass == '' ||
        this.code == ''
      ) {
        this.$snotify.error('Error, debes llenar todos los campos.')
        this.loading = true
      } else if (!validateEmail(this.form.email)) {
        this.$snotify.error('Email no valido')
        this.loading = true
      } else if (this.form.password != this.repeatPass) {
        this.$snotify.error('Las contraseñas no coiciden')
        this.loading = true
      } else if (this.code != '033') {
        this.$snotify.error('El codigo interno no es válido')
        this.loading = true
      } else {
        this.form.id_gym = 1
        this.REGISTER(this.form)
          .then((response) => {
            this.$snotify.success('Usuario registrado satisfactoriamente')
            this.$router.replace({ name: 'Inventory' })
            this.loading = true
          })
          .catch((error) => {
            this.$snotify.error('Usuario ya existente')
            this.loading = true
          })
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
    border: none;
    font-size: 1.2rem;
  }
  input::placeholder {
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.9 !important;
    color: rgb(255, 255, 255);
  }
  button {
    margin-top: 30px;
  }
}
</style>
