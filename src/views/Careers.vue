<template>
  <div id="title">
      <h1> See All Careers </h1>
      
  </div>

  <div id="careers">
    <CCard v-for="item in this.careers" :career="item" :key="item" @click="goCareerDetails(item.name)" />
  </div> 
</template>

<script>
import Careers from '@/json/careers.json'
import CCard from '@/components/CCard.vue'

export default {
  name: 'Careers',
  components: {
      CCard
  },
  data() { 
    return {
      careers: Careers
    }
  },
  methods: {
     goCareerDetails(careerName) { 
       this.$router.push("/careers/" + careerName);
     }
  }
} 
</script>

<style scoped>

#title { 
    margin-top: 3%;
}

#paragraph {
    margin: 5% 20%;
}

</style>
