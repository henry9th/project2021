<template>
  <div id="card">
    <h3 id="testimony-title"> {{ testimony.title }} </h3>
    <p id="testimony-body"> {{ testimony.author }} </p>
    <p id="testimony-body"> {{ testimony.body }} </p>
  </div>
</template>

<script>
export default {
  name: 'TCard',
  props: {
    testimony: Object,
  },
  methods: { 

  }
}

</script>


<style scoped>
  #card { 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 50%;
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
