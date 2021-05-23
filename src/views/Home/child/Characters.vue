<template>
  <div class="container-hp ">
    <div
      class="grid-custom"
      v-for="character in characters"
      :key="character.name"
    >
      <div class="card-hp">
        <img
          :src="character.image"
          :alt="character.name"
          @click="zoomCharacther(character)"
        />
        <h3 class="font-hrp custom-p">{{ character.name }}</h3>
      </div>
    </div>
    <b-modal
      v-model="modalShow"
      :title="data.name"
      ok-only
      :body-bg-variant="bodyBgVariant"
      centered
      modal-class="b-modal"
      >
      <img :src="data.image" :alt="data.name" class="img-modal" />
      <div class="mt-3">
        <p class="font-hrp"><span>House:</span> {{ data.house }}</p>
        <p class="font-hrp"><span>Gender:</span> {{ data.gender }}</p>
        <p class="font-hrp">
          <span>Date Of Birth:</span> {{ data.dateOfBirth }}
        </p>
        <p class="font-hrp"><span>Ancestry:</span> {{ data.ancestry }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Characters',
  props: ['characters'],
  data () {
    return {
      modalShow: false,
      data: {},
      bodyBgVariant: 'dark'
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

<style lang="scss">
.container-hp {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.custom-p {
  margin-top: 30px;
  text-align: center;
}
.card-hp img {
  width: 240px;
  height: 350px;
}
.img-modal {
  width: 240px;
  height: 350px;
  margin-inline: 120px;
}
.font-hrp {
  span {
    color: white;
    font-weight: 500;
  }
}
.b-modal{
  text-align: center;
  font-size: 30px;
}
</style>
