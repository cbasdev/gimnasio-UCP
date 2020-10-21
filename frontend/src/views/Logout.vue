<template>
  <div class="container-form">
    <h2>Ha cerrado sesion satisfactoriamente</h2>
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
  display: block;
  width: 100%;
  background-image: url('../assets/img/1.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  padding-top: 150px;
}
</style>
