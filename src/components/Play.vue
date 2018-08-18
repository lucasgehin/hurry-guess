<template>
    <div>
      <div v-for="question in questions.clues" :key="question">{{question}}</div>
    </div>
</template>

<script>
import json from '@/assets/data/question.json'
export default{
  data () {
    return {
      questions: json
    }
  }
}
</script>
