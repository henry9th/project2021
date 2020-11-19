<template>
  <div id="card">
    <div id="card-header"> 
      <button @click="goBack" class="btn btn-outline-secondary" id="back-button" v-if="this.count > 0"> B </button>
    </div>
    <div id="question-section">
      <h3> {{ qQuestion.question }} </h3>
    </div> 

    <div id="answer-section">
      <ul>
        <span v-for="(answer, index) in qQuestion.answers" v-bind:key="answer">
          <button @click="answered(index)" class="btn btn-outline-primary q-answer"> {{ answer }} </button>
        </span>
      </ul>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'QCard',
  props: {
    qQuestion: Object,
    count: Number
  },
  methods: { 
    answered(value) { 
      this.$emit('answered', value);
    },
    goBack() { 
      this.$emit('goback');
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
    padding: 5%
  }

  #card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  #question-section {
    width: 100%;
    display: block;
  }

  .q-answer {
     display: block;
     width: 50%;
     margin: auto;
     margin-top: 3%;
  }

  #card-header { 
     display: block;
     width: 100%;
  }

  #back-button { 
      
  }

  ul { 
    padding-inline-start: 00px;
  }

</style>
