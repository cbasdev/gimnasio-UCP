<template>
  <div>
    <h2>Registrar Nuevo Usuario</h2>
    <p>Cédula del usuario</p>
    <input v-model="dniSearch" placeholder="CC" />
    <p>Número de meses</p>
    <input v-model="mounths" placeholder="Meses" />
    <button>REGISTRAR</button>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      dniSearch: '',
    }
  },
}
</script>

<style></style>
