<template>
  <b-container>
    <HeaderBar />
    <router-view />
    <FooterBar />
  </b-container>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/Index.vue'
import FooterBar from '@/components/Footer/Index.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>
