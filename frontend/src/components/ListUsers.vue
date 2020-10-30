<template>
  <div class="pagination-container">
    <div v-if="loading" class="overflow-auto card card-pagination">
      <p class="mt-3 mb-0 titleTable">Lista de Usuarios</p>
      <p>Pagina {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
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
import { mixins } from '@/mixins'
export default {
  mixins: [mixins],
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
        .get('http://localhost:3000/api/users')
        .then((response) => {
          const data = response.data.users
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
      if (a.id_user < b.id_user) {
        return -1
      }
      if (a.id_user > b.id_user) {
        return 1
      }
      return 0
    },
    listInventory(listData) {
      let newList = listData.map((index) => {
        const state = this.getStateSuscription(
          index.last_date_in,
          index.acumulated_suscription
        )
        return {
          Nombre: index.name_user,
          Cedula: index.dni,
          Fecha_de_Ingreso: index.date_in,
          Ultima_Fecha_de_Suscripción: index.last_date_in,
          Meses_pagados: index.acumulated_suscription,
          Estado: state,
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
