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
        <template #cell(Estado)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <p
            v-if="isActive(data)"
            style="color:red"
            @click="openModalEdit(data)"
          >
            {{ data.value }}
          </p>
          <p
            v-if="!isActive(data)"
            style="color:green"
            @click="openModalEdit(data)"
          >
            {{ data.value }}
          </p>
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
import { mixins } from '@/mixins'
export default {
  props: ['listInv'],
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      items: [],
      rows: this.listInv.length,
      state_suscription: '',
    }
  },
  mixins: [mixins],
  mounted() {
    this.items = this.listInventory(this.listInv)
  },
  methods: {
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
          Estado: 'Activo',
        }
      })
      return newList
    },
    openModalEdit(resource) {
      console.log('item a editar resource', resource)
    },
    isActive(data) {
      return data === 'Activo'
    },
  },
}
</script>

<style></style>
