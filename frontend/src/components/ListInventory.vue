<template>
  <div class="card card-pagination">
    <div class="overflow-auto">
      <p class="mt-3 mb-0 titleTable">Lista de Inventario</p>
      <p>Pagina {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <template #cell(Editar)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <button class="btn btn-warning" @click="openModalEdit(data)">
            {{ data.value }}
          </button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="center"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loading: true,
      perPage: 10,
      currentPage: 1,
      items: [],
      rows: 0,
    }
  },
  mounted() {
    this.loading = false
    axios
      .get('http://localhost:3000/api/resources')
      .then((response) => {
        this.items = this.listInventory(response.data.resources)
        this.rows = this.items.length
      })
      .catch((error) => {
        this.loading = true
      })
  },
  methods: {
    listInventory(listData) {
      let newList = listData.map((index) => {
        return {
          Id_Recurso: index.id_resource,
          Nombre: index.name_resource,
          Descripción: index.description,
          Editar: 'Editar',
        }
      })
      return newList
    },
    openModalEdit(resource) {
      console.log('item a editar resource', resource)
    },
  },
}
</script>

<style></style>
