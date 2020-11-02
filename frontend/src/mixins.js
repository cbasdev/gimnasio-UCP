import moment from 'moment'
export const mixins = {
  methods: {
    getStateSuscription(date_in, suscription) {
      const actual = moment()
      const moment_date = moment(date_in, 'DD-MM-YYYY')
      const last_date_in = moment(moment_date).subtract(1, 'd')
      const add = moment_date.add(suscription, 'M')
      const state = actual.isBetween(last_date_in, add)
      return state ? 'Activo' : 'Inactivo'
    },
  },
}
