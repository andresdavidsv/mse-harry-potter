<template>
  <div class="home">
    <HomeTitle />
    <HomeForm/>
  </div>
</template>

<script>
import HomeTitle from '@/views/Home/HomeTitle.vue'
import HomeForm from '@/views/Home/HomeForm.vue'
export default {
  name: 'Home',
  components: {
    HomeTitle,
    HomeForm
  }
}
</script>
