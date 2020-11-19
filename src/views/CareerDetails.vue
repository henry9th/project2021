<template>
  <div id="title">
      <img :src="require('../assets/' + career.image)" />
      <h1> {{ career.name }} </h1>
  </div>

  <div id="paragraph">
      <p> {{ career.short }} </p>
  </div> 
  
  <Testimonies />

</template>

<script>
import Careers from '@/json/careers.json'
import Testimonies from '@/components/Testimonies.vue'

export default {
  name: 'CareerDetails',
  components: {
    Testimonies
  },
  data() {
    return {
      career: Careers[(this.$router.currentRoute._value.params.careerName).toLowerCase()],
      user: null
    }
  },
  methods: {

  },
  beforeMount(){
    // eventually we will fetch from the server user-input details of the career

    if (typeof this.career === 'undefined') {
      this.$router.push("/notfound");
    }

    this.user = this.$cookie.getCookie("user");
 }
} 
</script>

<style scoped>

#title { 
    margin-top: 3%;
}

#paragraph {
    margin: 3% 20%;
}

</style>
