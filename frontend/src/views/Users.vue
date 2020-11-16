<template>
  <div class="container-user">
    <h1>Panel de administración de usuarios</h1>
    <div class="row">
      <div class="col-md-2 mt-5">
        <a @click="selectPanel = 'ListUsers'">
          <button class="btn btn-light">
            Listar Usuarios
          </button>
        </a>
        <a @click="selectPanel = 'SearchUser'">
          <button class="btn btn-light">
            Consultar Usuario
          </button>
        </a>
        <a @click="selectPanel = 'RenewUser'">
          <button class="btn btn-light">
            Renovar Usuario
          </button>
        </a>
        <a @click="selectPanel = 'RegisterUser'">
          <button class="btn btn-light">
            Registrar Usuario
          </button>
        </a>
      </div>
      <div class="col-md-10">
        <div v-if="selectPanel == 'ListUsers'">
          <ListUsers />
        </div>
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
      selectPanel: 'ListUsers',
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
    padding: 30px 3% 0px 3%;
  }

  button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    width: 90%;
    padding: 5px;
    text-transform: uppercase;
    letter-spacing: 0px;
  }
  button:focus {
    background: #47ba4b !important;
  }
}
h1 {
  text-align: right;
  margin-right: 10%;
  color: white;
}
</style>
