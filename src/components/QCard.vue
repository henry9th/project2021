<template>
  <div id="card">
    <div id="question-section">
      <h3> {{ qQuestion.question }} </h3>
    </div> 

    <div id="answer-section">
      <ul>
        <span v-for="(answer, index) in qQuestion.answers" v-bind:key="answer">
          <button @click="answered(index)" class="btn btn-outline-primary qAnswer"> {{ answer }} </button>
        </span>
      </ul>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'QCard',
  props: {
    qQuestion: Object
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
    width: 70%;
    margin: auto;
    padding: 3%
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

</style>
