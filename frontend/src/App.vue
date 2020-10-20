<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        logo
      </div>
      <div class="end">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Iniciar Sesión</router-link> |
        <router-link to="/register">Registro</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
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
