<template id="site">
    <Header id="header" />
    <router-view />
    <Footer id="footer" />
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  beforeCreate () {
    if (this.$cookie.getCookie("user") !== null && typeof this.$cookie.getCookie("user") !== undefined) { 
      this.$store.dispatch("signin");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,body {
  height: 100%;
  min-height: 100%;
}

</style>
