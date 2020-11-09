<template>
  <div id="card">
    <div id="career-image">
        <img :src="require('../assets/' + career.image)" />
    </div>

    <div id="career-name">
        <b> {{ career.name }} </b>
    </div> 
 
    <div id="career-description">
        {{ career.short }}

    </div> 
  </div>
</template>

<script>
export default {
  name: 'CCard',
  props: {
    career: Object,
  },
  methods: { 
    answered(value) { 
      this.$emit('answered', value);
    }
  }
}

</script>


<style scoped>
  #card { 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 30%;
    height: 400px;
    margin: auto;
    padding: 3%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    margin-left: 1.5%;
    margin-right: 1.5%;
    margin-top: 3%;
  }

  #card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .qAnswer {
     display: block;
     width: 50%;
     margin: auto;
     margin-top: 3%;
  }

  #career-description {
    margin-top: 10px;
  }

</style>
