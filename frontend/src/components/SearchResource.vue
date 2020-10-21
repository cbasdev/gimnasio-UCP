<template>
  <div>
    <h2>Buscar Recurso en Inventario</h2>
    <input v-model="dniSearch" placeholder="Nomb" />
    <button>BUSCAR</button>
  </div>
</template>

<script>
export default {
  name: 'SearchResource',
  data() {
    return {
      dniSearch: '',
    }
  },
}
</script>

<style></style>
