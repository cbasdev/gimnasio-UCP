<template>
  <div class="container-user">
    <h1>Panel de administración de Inventario</h1>
    <div class="row">
      <div class="col-md-4 mt-5">
        <button class="btn btn-light" @click="selectPanel = 'ListInventory'">
          Ver Inventario
        </button>

        <button class="btn btn-light" @click="selectPanel = 'AgregarResource'">
          Agregar Recurso
        </button>
      </div>
      <div class="col-md-8 ">
        <div v-if="selectPanel == 'ListInventory'">
          <ListInventory />
        </div>
        <div v-if="selectPanel == 'AgregarResource'"><AddResource /></div>
      </div>
    </div>
  </div>
</template>

<script>
import ListInventory from '../components/ListInventory'
import AddResource from '../components/AddResource'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'Inventory',
  components: {
    ListInventory,
    AddResource,
  },
  data() {
    return {
      selectPanel: 'ListInventory',
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
