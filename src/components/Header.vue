<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        GoGetIt
      </router-link>
      <ul class="nav navbar-nav pull-right">
        <router-link class="navbar-brand" to="/about">
            About
        </router-link>
        <router-link class="navbar-brand" to="/careers">
            Careers
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped> 



</style>