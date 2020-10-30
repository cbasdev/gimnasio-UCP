<template>
  <div class="pagination-container">
    <div v-if="loading" class="overflow-auto card card-pagination">
      <p class="mt-3 mb-0 titleTable">Lista de Inventario</p>
      <p>Pagina {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
        <template #cell(Acción)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <button class="btn btn-warning" @click="openModalEdit(data)">
            {{ data.value.edit }}
          </button>
          <button
            class="btn ml-1 btn-danger"
            @click="removeResource(data.item.id)"
          >
            {{ data.value.remove }}
          </button>
          <modal :height="320" :name="'modal' + data.index">
            <div class="container-modal">
              <h4>Editar Recurso</h4>
              <form>
                <small>Referencia</small>
                <input
                  class="form-control"
                  type="text"
                  v-bind:value="data.item.Referencia"
                  v-on:input="data.item.Referencia = $event.target.value"
                />
                <small>Nombre</small>
                <input
                  class="form-control"
                  type="text"
                  v-bind:value="data.item.Nombre"
                  v-on:input="data.item.Nombre = $event.target.value"
                />
                <small>Descripción {{ data.item.Descripción }} </small>
                <input
                  class="form-control input-group-prepend"
                  type="text"
                  v-bind:value="data.item.Descripción"
                  v-on:input="data.item.Descripción = $event.target.value"
                />
                <button
                  v-if="!loadingModal"
                  @click="editResource(data.item)"
                  class="btn btn-standar mt-3"
                >
                  Editar
                </button>
                <div v-if="loadingModal" class="text-center mt-3">
                  <b-spinner variant="warning" label="Spinning"></b-spinner>
                </div>
              </form>
            </div>
          </modal>
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
    <div v-if="!loading" class="text-center mt-5">
      <b-spinner variant="warning" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loadingModal: false,
      loading: false,
      perPage: 10,
      currentPage: 1,
      items: [],
      rows: 0,
      edit: {},
      test: '',
      modalOpen: '',
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = false
      axios
        .get('http://localhost:3000/api/resources')
        .then((response) => {
          const data = response.data.resources
          const sortData = data.sort(this.compare)
          this.items = this.listInventory(sortData)
          this.rows = this.items.length
          this.loading = true
        })
        .catch((error) => {
          this.loading = true
        })
    },
    compare(a, b) {
      if (a.id_resource < b.id_resource) {
        return -1
      }
      if (a.id_resource > b.id_resource) {
        return 1
      }
      return 0
    },
    listInventory(listData) {
      let newList = listData.map((index) => {
        return {
          id: index.id_resource,
          Referencia: index.reference,
          Nombre: index.name_resource,
          Descripción: index.description,
          Acción: { edit: 'Editar', remove: 'Eliminar' },
        }
      })
      return newList
    },
    openModalEdit(resource) {
      this.$modal.show(`modal${resource.index}`)
      this.modalOpen = `modal${resource.index}`
    },
    editResource(resource) {
      this.edit.name_resource = resource.Nombre
      this.edit.description = resource.Descripción
      this.edit.reference = resource.Referencia
      this.edit.id_resource = resource.id
      this.edit.id_gym = 1
      axios
        .put('http://localhost:3000/api/resource', this.edit)
        .then((res) => {
          this.$snotify.success('Recurso editado satisfactoriamente')
          this.$modal.hide(this.modalOpen)
          this.loadData()
        })
        .catch((err) => {
          console.log(err)
          this.$snotify.error('Error editando el recurso: ', err)
          this.$modal.hide(this.modalOpen)
          this.loadData()
        })
    },
    removeResource(id) {
      axios
        .delete(`http://localhost:3000/api/resource/${id}`)
        .then((res) => {
          this.$snotify.success('Recurso eliminado satisfactoriamente')
          this.loadData()
        })
        .catch((err) => {
          console.log(err)
          this.$snotify.error('Error eliminando el recurso: ', err)
          this.loadData()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container-modal {
  padding: 20px;
  form {
    text-align: left;
    button {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
