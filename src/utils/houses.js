// API URL
const API_URL = 'http://hp-api.herokuapp.com/api/characters'

async function fetchCharactersData () {
  const res = await fetch(API_URL)
  const data = await res.json()
  return data
}

export default fetchCharactersData()
