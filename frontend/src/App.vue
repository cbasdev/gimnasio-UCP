<template>
  <div id="app">
    <div id="nav" v-if="!tokenAuth">
      <div class="logo">
        logo
      </div>
      <div class="end">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Iniciar Sesión</router-link> |
        <router-link to="/register">Registro</router-link>
      </div>
    </div>
    <div id="nav" v-if="tokenAuth">
      <div class="logo">
        logo
      </div>
      <div class="end">
        <router-link to="/users">Administrar Usuarios</router-link> |
        <router-link to="/inventory">Administrar Inventario</router-link> |
        <router-link to="/logout">Cerrar Sesion</router-link>
      </div>
    </div>
    <router-view />
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['tokenAuth']),
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
}

#nav {
  position: fixed;
  width: 100%;
  align-items: center;
  padding: 30px 10% 30px 10%;
  .logo {
    width: 40%;
    display: inline-block;
    color: white;
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
      color: #ffd500;
    }
  }
}
</style>
