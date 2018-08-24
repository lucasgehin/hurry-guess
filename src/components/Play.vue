<template>
    <div>
      <div v-if="gameRunning">
        <div v-if="gamePaused" class="mask">
        <span @click="setGamePaused(false)">Reprendre</span>
        <router-link to="/">Quitter</router-link>
      </div>
      <div v-if="!gamePaused">
        <span @click="setGamePaused(true)">set pause</span>
      </div>
      <div v-if="timer !== false">
        <div v-if="currentQuestion === 0">La partie commence dans</div>
        <div v-else>Prochaine question dans</div>
        {{timer}}
      </div>
      <div v-if="clue">{{clue}}</div>
      </div>
      <div v-else>
        Réponses
        <div v-for="question in questions">
          {{question.answer}}
        </div>
      </div>
    </div>
</template>

<script>
import questions from '@/assets/data/question.json'

var timer = false
var changeTime = 3000
var currentQuestion = 0
var maxQuestion = 3
var currrentClue = 0
var maxClue = 5

export default {
  data () {
    return {
      gameRunning: false,
      gamePaused: false,
      questions: questions,
      currentQuestion: currentQuestion,
      currrentClue: currrentClue,
      timer: timer,
      clue: false
    }
  },
  methods: {
    setGamePaused (pause) {
      this.gamePaused = pause
    },
    runGame () {
      this.gameRunning = true
      this.runQuestion()
    },
    runTimer () {
      return new Promise((resolve, reject) => {
        this.timer = 5
        const timerInterval = setInterval(function () {
          if (this.timer === 0) {
            clearInterval(timerInterval)
            resolve()
          } else {
            this.timer = this.timer - 1
          }
        }.bind(this), 1000)
      })
    },
    runQuestion () {
      this.runTimer()
        .then((data) => {
          this.timer = false
          this.runClue()
            .then((data) => {
              this.clue = false
              this.currrentClue = 0
              this.currentQuestion++
              if (this.currentQuestion < maxQuestion) {
                this.runQuestion()
              } else {
                this.gameRunning = false
              }
            })
        })
    },
    runClue () {
      return new Promise((resolve, reject) => {
        this.clue = this.questions[this.currentQuestion]['clues'][this.currrentClue]
        this.currrentClue++
        const clueInterval = setInterval(function () {
          this.clue = this.questions[this.currentQuestion]['clues'][this.currrentClue]
          if (this.currrentClue === maxClue) {
            clearInterval(clueInterval)
            resolve()
          } else {
            this.currrentClue++
          }
        }.bind(this), changeTime)
      })
    }
  },
  beforeMount () {
    this.runGame()
  }
}
</script>

<style>
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
