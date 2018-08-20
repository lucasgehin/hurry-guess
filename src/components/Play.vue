<template>
    <div>
      <div v-if="gameRunning">
        <div v-if="gamePaused" class="pause-screen">
        <span @click="setGamePaused(false)">Reprendre</span>
        <router-link to="/">Quitter</router-link>
      </div>
      <div v-if="!gamePaused">
        <span @click="setGamePaused(true)">set pause</span>
      </div>
      <div v-if="timer !== false">{{timer}}</div>
      <div v-if="clue">{{clue}}</div>
      </div>
      <div v-else>
        fini
      </div>
    </div>
</template>

<script>
import questions from '@/assets/data/question.json'

console.log(questions)

var timer = false
var changeTime = 3000
var currentQuestion = 0
var maxQuestion = 1
var currrentClue = 0
var maxClue = 4

console.log(questions[currentQuestion])

export default {
  data () {
    return {
      gameRunning: false,
      gamePaused: false,
      question: questions[currentQuestion],
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
      this.runTimer()
        .then((data) => {
          this.timer = false
        })
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
    }
  },
  beforeMount () {
    this.runGame()
  }
}
</script>

<style>
  .pause-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
