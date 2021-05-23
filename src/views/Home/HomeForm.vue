<template>
  <div class="container my-3">
    <b-form @submit.prevent="onSubmit">
      <div class="row form">
        <div class="col-sm col-md">
          <b-form-group
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
        <div class="col-sm col-md">
          <b-form-group
            label="Select a House:"
            label-for="input-house"
          >
            <b-form-select
              id="input-house"
              v-model="state.filterHouse"
              size="lg"
              :options="state.houses"
              v-on:change="displayCharacterbyHouse"
              required
            />
          </b-form-group>
        </div>
        <b-form-radio-group
          class="col-sm col-md"
          v-model="state.selected"
          :options="state.options"
          name="radio-options"
          @change="reactiveSelect"
        ></b-form-radio-group>
      </div>
    </b-form>
    <div class="div-center">
      <h4 class="font-hrp">Total Members Found: {{this.state.searchBy.length}}</h4>
    </div>
    <div v-if="this.state.searchBy.length == 0" class="not-found">
      <h3 class="font-hrp">Try again! No results found.</h3>
    </div>
    <Characters :characters="this.state.searchBy" ></Characters>
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
          ? (API_URL = 'https://hp-api.herokuapp.com/api/characters/staff')
          : selected === 'students'
            ? (API_URL = 'https://hp-api.herokuapp.com/api/characters/students')
            : (API_URL = 'https://hp-api.herokuapp.com/api/characters')
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

<style lang="scss">
  .form{
    display: flex;
    align-items: center
  }
  .div-center, .not-found{
    text-align: center
  }

</style>
