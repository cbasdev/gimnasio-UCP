<template>
  <div>
    <h2>Buscar Usuario</h2>
    <p>Cédula del usuario</p>
    <input v-model="dniSearch" placeholder="CC" />
    <button>BUSCAR</button>
  </div>
</template>

<script>
export default {
  name: 'SearchUser',
  data() {
    return {
      dniSearch: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
