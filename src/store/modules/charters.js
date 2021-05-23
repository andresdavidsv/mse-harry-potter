// charters.js

// Importamos nuestra función que obtiene el token
// @ es un alias para /src
import * as api from '@/api/api'

// Creamos el objeto con "Espacio de Nombres"
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getCharacters () {
      api
        .fetchCharactersData()
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log('Error: ', err)
        })
        .finally(() => {
          console.log('Done!')
        })
    }
  }
}
