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
        <template #cell(Acción)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <button class="btn btn-warning" @click="openModalEdit(data)">
            Editar
          </button>
          <button class="btn btn-danger ml-2" @click="deleteUser(data)">
            Eliminar
          </button>

          <modal :height="400" :name="'modal' + data.index">
            <div class="container-modal">
              <h4>Editar Usuario</h4>
              <div class="form-user mt-5">
                <div class="item ">
                  <small>Nombre</small>
                  <input
                    class="form-control"
                    type="text"
                    v-bind:value="data.item.Nombre"
                    v-on:input="data.item.Nombre = $event.target.value"
                  />
                </div>
                <div class="item">
                  <small>Cédula</small>
                  <input
                    class="form-control"
                    type="number"
                    v-bind:value="data.item.Cedula"
                    v-on:input="data.item.Cedula = $event.target.value"
                  />
                </div>

                <div class="item">
                  <small>Meses Pagados</small>
                  <input
                    class="form-control input-group-prepend"
                    type="text"
                    v-bind:value="data.item.Meses_pagados"
                    v-on:input="data.item.Meses_pagados = $event.target.value"
                  />
                </div>

                <button
                  v-if="!loadingModal"
                  @click="editUser(data.item)"
                  class="btn btn-standar mt-3"
                >
                  Editar
                </button>
                <div v-if="loadingModal" class="text-center mt-3">
                  <b-spinner variant="warning" label="Spinning"></b-spinner>
                </div>
              </div>
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
import { mixins } from '@/mixins'

export default {
  mixins: [mixins],
  data() {
    return {
      loadingModal: false,
      loading: false,
      perPage: 7,
      currentPage: 1,
      items: [],
      rows: 0,
      edit: {},
      edit_date_in: null,
      edit_last_date_in: null,
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
          this.items = this.listUsers(sortData)
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
    listUsers(listData) {
      let newList = listData.map((index) => {
        const state = this.getStateSuscription(
          index.last_date_in,
          index.acumulated_suscription
        )
        const limited = this.getLimitDate(
          index.last_date_in,
          index.acumulated_suscription
        )
        return {
          Nombre: index.name_user,
          Cedula: index.dni,
          Ingreso: index.date_in,
          Ultima_Fecha_de_Pago: index.last_date_in,
          Vencimiento: limited,
          Meses_pagados: index.acumulated_suscription,
          Estado: state,
          Acción: 'Eliminar',
        }
      })
      return newList
    },
    openModalEdit(user) {
      this.$modal.show(`modal${user.index}`)
      this.edit.dni = user.item.Cedula
      this.modalOpen = `modal${user.index}`
    },

    editUser(user) {
      this.edit.name_user = user.Nombre
      this.edit.new_dni = user.Cedula
      this.edit.acumulated_suscription = user.Meses_pagados
      this.edit.id_gym = 1
      axios
        .put('http://localhost:3000/api/user', this.edit)
        .then((res) => {
          this.$snotify.success('Usuario editado satisfactoriamente')
          this.$modal.hide(this.modalOpen)
          this.loadData()
        })
        .catch((err) => {
          this.$snotify.error('Error editando el usuario: ', err)
          this.$modal.hide(this.modalOpen)

          this.loadData()
        })
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

    deleteUser(data) {
      axios
        .delete(`http://localhost:3000/api/user/${data.item.Cedula}`)
        .then((res) => {
          this.$snotify.success('Usuario eliminado satisfactoriamente')
          this.loadData()
        })
        .catch((err) => {
          console.log(err)
          this.$snotify.error('Error eliminando el usuario: ', err)
          this.loadData()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container-modal {
  .item {
    margin-top: 8px !important;
  }
  .datePicker {
    display: block;
  }
  padding: 40px;
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
