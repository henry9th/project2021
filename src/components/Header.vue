<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link class="navbar-brand" to="/"> Project 2021 </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/about"> About </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/infographics"> Data </router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/careers"> Careers </router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/login" v-if="signedIn === 0">
            Login / Register
          </router-link>

          <a id="logout-link" class="nav-link" to="/login" @click="signout" v-else>
            Sign Out 
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  computed: { 
    signedIn() { 
      return this.$store.state.signedIn;
    }
  },
  methods: {
    signout() { 
      this.$cookie.removeCookie("user");
      this.$store.dispatch("signout");
    }
  }
};
</script>

<style scoped>

#logout-link:hover {
    cursor: pointer;
}

</style>
