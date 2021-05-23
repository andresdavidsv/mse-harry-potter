<template>
  <div>
    <div v-for="character in characters" :key="character.name">
      <b-card
        :title="character.name"
        :img-src="character.image"
        :img-alt="character.name"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
        @click="zoomCharacther(character)"
      >
        <b-card-text> </b-card-text>
      </b-card>
      <b-modal v-model="modalShow" centered :title="data.name" ok-only>
        <img :src="data.image" alt="data.name" style="width: 250px;" class="mb-2">
        <p> House: {{data.house}}</p>
        <p> Gender: {{data.gender}}</p>
        <p> Date Of Birth: {{data.dateOfBirth}}</p>
        <p> Ancestry: {{data.ancestry}}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Characters',
  props: ['characters'],
  data () {
    return {
      modalShow: false,
      data: {}
    }
  },
  methods: {
    zoomCharacther (character) {
      this.modalShow = !this.modalShow
      this.data = character
    }
  }
}
</script>
