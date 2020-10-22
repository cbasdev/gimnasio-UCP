<template>
  <div class="container-form text-center">
    <h1>Ha cerrado sesion satisfactoriamente</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Logout',
  mounted() {
    this.CLOSE_SESSION()
  },
  methods: {
    ...mapActions(['CLOSE_SESSION']),
  },
}
</script>

<style lang="scss" scoped>
.container-form {
  h1 {
    padding: 100px 300px 100px 300px;
    color: white;
    font-size: 5rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    margin-bottom: 50px;
  }
  display: block;
  width: 100%;
  background-image: url('../assets/img/1.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  padding-top: 150px;
}
</style>
