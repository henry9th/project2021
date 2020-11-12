<template>
  <div>
      <h1 id="title"> Career Questionnaire </h1>
      <QCard :qQuestion="this.questions[this.count]" :count="this.count" @answered="handleAnswer" @goback="handleBack" :key="this.count" v-if="this.count < this.questions.length - 1"/>

      <QResults v-if="this.count === this.questions.length - 1" />
  </div>
</template>

<script>
import QCard from '@/components/QCard.vue'
import QQuestions from '@/json/qQuestions.json'
import QResults from '@/components/QResults.vue'

export default {
  name: 'Questionnaire',
  components: {
      QCard,
      QResults
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
      },
      handleBack() { 
          this.count--;
      }
  }
} 
</script>

<style scoped>

    #title { 
        margin-bottom: 5%;
    }

</style>
