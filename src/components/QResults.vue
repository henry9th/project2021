<template>
  <div id="card">
    You have finished the Questionnairre. Consider the below careers. 
  </div>
</template>

<script>
export default {
  name: 'QResults',
  props: {

  },
  methods: { 
    
  }
}
</script>


<style scoped>
  #card { 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 70%;
    margin: auto;
    padding: 5%
  }

  #card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

</style>
