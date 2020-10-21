<template>
  <div class="container-user">
    <h1>Panel de administración de usuarios</h1>
    <div class="row">
      <div class="col-md-4 bg-dark">
        <button class="btn btn-light" @click="selectPanel = 'ListUsers'">
          Listar Usuarios
        </button>
        <button class="btn btn-light" @click="selectPanel = 'SearchUser'">
          Consultar Usuario
        </button>
        <button class="btn btn-light" @click="selectPanel = 'RenewUser'">
          Renovar Usuario
        </button>
        <button class="btn btn-light" @click="selectPanel = 'RegisterUser'">
          Registrar Usuario
        </button>
      </div>
      <div class="col-md-8 bg-danger">
        <div v-if="selectPanel == 'ListUsers'"><ListUsers /></div>
        <div v-if="selectPanel == 'SearchUser'"><SearchUser /></div>
        <div v-if="selectPanel == 'RenewUser'"><RenewUser /></div>
        <div v-if="selectPanel == 'RegisterUser'"><RegisterUser /></div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchUser from '../components/SearchUser'
import RenewUser from '../components/RenewUser'
import RegisterUser from '../components/RegisterUser'
import ListUsers from '../components/ListUsers'

export default {
  name: 'Users',
  components: {
    SearchUser,
    RenewUser,
    RegisterUser,
    ListUsers,
  },
  data() {
    return {
      selectPanel: 'SearchUser',
    }
  },
}
</script>

<style lang="scss" scoped>
.container-user {
  display: block;
  width: 100%;
  background-image: url('../assets/img/1.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
  padding-top: 150px;
  text-align: center;
  .row {
    margin: 0;
    padding: 50px 10% 0px 10%;
  }
  button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 50%;
    padding: 5px;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
}
h1 {
  color: white;
}
</style>
