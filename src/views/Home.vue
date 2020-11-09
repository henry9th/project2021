<template>
  <div id="welcome">
    <div id="color-layer"> 
      <span id="welcome-message"> 
        Welcome to GGI. 

      </span>
    </div>
  </div>

  <div id="questionnaire">
      <Questionnaire />
  </div>
</template>

<script>

import Questionnaire from '@/components/Questionnaire.vue'

export default {
  name: 'Home',
  components: {
      Questionnaire
  },
  methods: {
     
  }
} 
</script>

<style scoped>

html,body { 
  height: 100%;
}

#welcome {
  height: 35vh;
  background-image: url("../assets/rainier.jpg");
  background-position: center;
  background-size: cover;
}

#welcome-message {
  color: white;
  font-size: 1.5em;
}

#color-layer { 
   background-color: rgba(0, 0, 0, 0.5);
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center; 
   justify-content: center;
}

#questionnaire { 
  margin-top: 10%;

}

</style>
