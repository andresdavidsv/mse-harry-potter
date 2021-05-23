<template>
  <div class="header-bar">
    <div class="navigation-bar">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{ name: 'Home' }">
          <img src="@/assets/img/hat.png" alt="MSE" width="30">
          <span class="font-hrp ml-2">MSE</span>
        </b-navbar-brand>
      </b-navbar>
    </div>

  </div>
</template>

<script>

export default {
  name: 'HeaderBar'
}
</script>
