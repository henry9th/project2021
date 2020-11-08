<template>
  <div>
      <h1 id="title"> Career Questionnaire </h1>
      <QCard :qQuestion="this.questions[this.count]" @answered="handleAnswer" :key="this.count" />
  </div>
</template>

<script>
import QCard from './QCard.vue'
import QQuestions from '@/json/qQuestions.json'

export default {
  name: 'Questionnaire',
  components: {
      QCard
  },
  data() {
      return {
          questions: QQuestions,
          count: 0,
          answerArr: []
      }
  },
  methods: {
      handleAnswer(value) { 
          // we need to store the answer
          this.answerArr.push(value)

          if (this.count == this.questions.length - 1) { 
              alert("done");
          } else { 
            this.count++;
          }
      }
  }
} 
</script>

<style scoped>

    #title { 
        margin-bottom: 5%;
    }

</style>
