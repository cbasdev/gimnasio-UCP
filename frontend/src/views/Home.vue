<template>
  <div class="container-form text-center">
    <h1 class="title">BIENVENIDO</h1>
    <h1>JOSE SPORT GYM</h1>

    <div @click="$router.push('/login')" class="btn btn-standar mr-4">
      INICIAR SESION
    </div>
    <div @click="$router.push('/register')" class="btn btn-standar">
      REGISTRARSE
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
.container-form {
  display: block;
  width: 100%;
  background-image: url('../assets/img/1.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  padding-top: 150px;
}

h1 {
  color: white;
  font-size: 2.5rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 50px;
}
.title {
  font-size: 8rem;
}
</style>
