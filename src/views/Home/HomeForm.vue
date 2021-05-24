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
    <BaseLoading v-if="this.state.isLoading" />
    <Characters :characters="this.state.searchBy"></Characters>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import Characters from './child/Characters'
import BaseLoading from '@/components/BaseLoading'
import { URL, STUDENTSURL, STAFFSURL } from '@/api/apiHP'
export default {
  name: 'MainForm',
  components: {
    Characters,
    BaseLoading
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
      ],
      isLoading: false
    })
    return { state }
  },
  mounted () {
    this.state.isLoading = true
    this.fetchCharactersData()
    this.state.isLoading = false
  },
  methods: {
    async fetchCharactersData (selected) {
      this.state.isLoading = true
      try {
        let API_URL
        selected === 'staff'
          ? API_URL = STAFFSURL
          : selected === 'students'
            ? API_URL = STUDENTSURL
            : API_URL = URL.baseURL
        const res = await fetch(API_URL)
        this.state.characters = await res.json()
        this.state.searchBy = this.state.characters
        this.loadHouseData(this.state.characters)
        this.state.isLoading = false
        return this.state.characters
      } catch (error) {
        console.error(error)
        this.state.isLoading = false
      }
    },
    async loadHouseData (data) {
      this.state.isLoading = true
      const houses = data.map((c) => {
        return c.house
      })
      this.state.houses = houses.filter((value, index) => {
        return houses.indexOf(value) === index
      })
      this.state.isLoading = false
    },
    displayCharacterbyHouse () {
      this.state.isLoading = true
      this.state.searchBy = this.state.characters.filter((e) => {
        return e.house.includes(this.state.filterHouse)
      })
      this.state.isLoading = false
    },
    displayCharacterbyName (value) {
      this.state.isLoading = true
      this.state.filterName = value
      this.state.searchBy = this.state.characters.filter((e) => {
        return e.name.toLowerCase().includes(this.state.filterName)
      })
      this.state.isLoading = false
    },
    reactiveSelect (arg) {
      this.state.isLoading = true
      this.fetchCharactersData(arg)
      setTimeout(() => {
        this.state.isLoading = true
        this.displayCharacterbyName(this.state.filterName)
        this.state.isLoading = true
        this.displayCharacterbyHouse()
      }, 1000)
      this.state.isLoading = false
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
