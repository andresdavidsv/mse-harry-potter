// API URL
const API_URL = 'http://hp-api.herokuapp.com/api/characters'

async function fetchCharactersData () {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default { fetchCharactersData }
