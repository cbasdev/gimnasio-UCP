<template>
  <div>
    <h2>Renovar Usuario</h2>
    <p>Cédula del usuario</p>
    <input v-model="dniSearch" placeholder="CC" />
    <p>Número de meses</p>
    <input v-model="mounths" placeholder="Meses" />
    <button>RENOVAR</button>
  </div>
</template>

<script>
export default {
  name: 'RenewUser',
  data() {
    return {
      dniSearch: '',
      mounths: '',
    }
  },
}
</script>

<style lang="scss" scoped></style>
