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
export default {
  props: ['listInv'],
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      items: [],
      rows: this.listInv.length,
    }
  },
  mounted() {
    this.items = this.listInventory(this.listInv)
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
