<template>
  <div id="title">
      <img :src="require('../assets/' + career.image)" />
      <h1> {{ career.name }} </h1>
  </div>

  <div id="paragraph">
      <p> {{ career.short }} </p>
  </div> 
</template>

<script>
import Careers from '@/json/careers.json'

export default {
  name: 'CareerDetails',
  props: { 

  },
  data() {
    return {
      career: Careers[(this.$router.currentRoute._value.params.careerName).toLowerCase()]
    }
  },
  methods: {

  },
  beforeMount(){
    // eventually we will fetch from the server user-input details of the career

    if (typeof this.career === 'undefined') {
      this.$router.push("/notfound");
    }
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
