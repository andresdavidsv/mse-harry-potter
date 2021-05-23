<template>
  <div class="container search-form my-3">
    <b-form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-sm">
          <b-form-group
            id="input-group-1"
            label="Full Name:"
            label-for="input-text"
          >
            <b-form-input
              id="input-text"
              v-model="state.filterName"
              type="text"
              size="lg"
              required
              placeholder="Name or LastName"
              @input="displayCharacterbyName($event)"
            />
          </b-form-group>
        </div>
        <div class="col-sm">
          <b-form-group
            id="input-group-3"
            label="House:"
            label-for="input-house"
          >
            <b-form-select
              id="input-region"
              v-model="state.filterHouse"
              size="lg"
              :options="state.houses"
              v-on:change="displayCharacterbyHouse"
              required
            />
          </b-form-group>
        </div>
      </div>
      <b-form-radio-group
        v-model="state.selected"
        :options="state.options"
        name="radio-options"
        @change="reactiveSelect"
      ></b-form-radio-group>
    </b-form>
    <Characters :characters="this.state.searchBy"></Characters>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import Characters from './child/Characters'
export default {
  name: 'MainForm',
  components: {
    Characters
  },
  setup () {
    const state = reactive({
      filterHouse: '',
      filterName: '',
      characters: [],
      houses: [],
      names: '',
      searchBy: [],
      selected: 'all',
      options: [
        { text: 'All', value: 'all' },
        { text: 'Staff', value: 'staff' },
        { text: 'Students', value: 'students' }
      ]
    })
    return { state }
  },
  mounted () {
    this.fetchCharactersData()
  },
  methods: {
    async fetchCharactersData (selected) {
      try {
        let API_URL
        selected === 'staff'
          ? API_URL = 'http://hp-api.herokuapp.com/api/characters/staff' : selected === 'student'
            ? API_URL = 'http://hp-api.herokuapp.com/api/characters/students' : API_URL = 'http://hp-api.herokuapp.com/api/characters'
        const res = await fetch(API_URL)
        this.state.characters = await res.json()
        this.state.searchBy = this.state.characters
        this.loadHouseData(this.state.characters)
        return this.state.characters
      } catch (error) {
        console.error(error)
      }
    },
    async loadHouseData (data) {
      const houses = data.map((c) => {
        return c.house
      })
      this.state.houses = houses.filter((value, index) => {
        return houses.indexOf(value) === index
      })
    },
    displayCharacterbyHouse () {
      this.state.searchBy = this.state.characters.filter((e) => {
        return e.house.includes(this.state.filterHouse)
      })
    },
    displayCharacterbyName (value) {
      this.state.filterName = value
      this.state.searchBy = this.state.characters.filter((e) => {
        return e.name.toLowerCase().includes(this.state.filterName)
      })
    },
    reactiveSelect (arg) {
      this.fetchCharactersData(arg)
      setTimeout(() => {
        this.displayCharacterbyName(this.state.filterName)
        this.displayCharacterbyHouse()
      }, 800)
    }
  }
}
</script>
