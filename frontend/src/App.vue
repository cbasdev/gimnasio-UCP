<template>
  <div id="app">
    <div id="nav" v-if="!tokenAuth">
      <div class="logo">
        <router-link to="/">
          <img
            @click="this.$router.replace({ name: 'Home' })"
            src="./assets/logo.png"
            alt="logo"
          />
        </router-link>
      </div>
      <div class="end">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Iniciar Sesión</router-link> |
        <router-link to="/register">Registro</router-link>
      </div>
    </div>
    <div id="nav" v-if="tokenAuth">
      <div class="logo">
        <router-link to="/users">
          <img
            @click="this.$router.replace({ name: 'Home' })"
            src="./assets/logo.png"
            alt="logo"
          />
        </router-link>
      </div>
      <div class="end">
        <router-link to="/users">Administrar Usuarios</router-link> |
        <router-link to="/inventory">Administrar Inventario</router-link> |
        <router-link to="/logout">Cerrar Sesion</router-link>
      </div>
    </div>
    <router-view />
    <div v-if="!loading" class="text-center">
      <b-spinner variant="warning" label="Spinning"></b-spinner>
    </div>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['tokenAuth', 'loading']),
  },
}
</script>

<style lang="scss">
@import '~vue-snotify/styles/material';
@import './assets/theme.scss';

#app {
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  background-color: #000;
  h2 {
    color: $principal-color;
  }
  .btn-standar {
    background: $principal-color;
    color: $dark-color;
    padding: 10px 20px 10px 20px;
    font-size: 1.2rem;
  }
}

#nav {
  z-index: 1;
  position: fixed;
  width: 100%;
  align-items: center;
  padding: 30px 10% 30px 10%;
  .logo {
    width: 40%;
    display: inline-block;
    color: white;
    img {
      width: 80px;
    }
  }
  .end {
    width: 60%;
    display: inline-block;
    text-align: right;
  }
  a {
    margin-left: 30px;
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: $principal-color;
    }
  }
}
</style>
