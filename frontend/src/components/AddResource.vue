<template>
  <div>
    <h2>Agregar Nuevo Recurso</h2>
    <div class="form-container">
      <input v-model="form.reference" placeholder="Identificador" />
      <input v-model="form.name_resource" placeholder="Nombre del Recurso" />
      <input v-model="form.description" placeholder="Descripción" />
      <button @click="addResource" class="btn btn-standar mt-4">AGREGAR</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddResource',
  data() {
    return {
      form: {},
    }
  },
  methods: {
    addResource() {
      if (
        !this.form.reference ||
        !this.form.name_resource ||
        !this.form.description
      ) {
        this.$snotify.error('Error, debes llenar todos los campos.')
      } else {
        this.form.id_gym = 1
        axios
          .post('http://localhost:3000/api/resource', this.form)
          .then((response) => {
            this.$snotify.success('Inventario registrado satisfactoriamente')
            location.reload()
          })
          .catch((error) => {
            this.$snotify.error('Error al agregar inventario: ', error)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/theme.scss';
h2 {
  margin-top: 30px;
}
.form-container {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  padding: 10px;
  input {
    font-family: 'Muli', sans-serif;
    text-align: center;
    color: white;
    padding: 10px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.253);
    margin-top: 10px;
    width: 70%;
    display: block;
    margin-right: auto;
    margin-left: auto;
    border: none;
    font-size: 1.2rem;
  }
  input::placeholder {
    font-size: 1.2rem;
    font-weight: 600;
    opacity: 0.9 !important;
    color: rgb(255, 255, 255);
  }
}
</style>
