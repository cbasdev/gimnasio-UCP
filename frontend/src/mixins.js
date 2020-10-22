import moment from 'moment'
export const mixins = {
  methods: {
    getStateSuscription(date_in, suscription) {
      const actual = moment()
      const moment_date = moment(date_in, 'DD-MM-YYYY')
      const add = moment_date.add(suscription, 'M')
      const state = actual.isBetween(moment_date, add)
      console.log(`
      La fecha actual: ${actual.format(
        'DD-MM-YYYY'
      )} esta entre ${moment_date.format('DD-MM-YYYY')} y ${add.format(
        'DD-MM-YYYY'
      )}
      `)
      console.log(state)
    },
  },
}
