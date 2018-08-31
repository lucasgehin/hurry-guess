<template>
    <div>
      <div v-if="gameRunning">
        <div v-if="gamePaused" class="mask">
        <span @click="setGamePaused(false)">Reprendre</span>
        <router-link to="/">Quitter</router-link>
      </div>
      <div v-if="!gamePaused">
        <span @click="setGamePaused(true)" class="pause"><img src="static/pause.png"></span>
      </div>
      <div v-if="timer !== false" class="centered">
        <div v-if="currentQuestion === 0" class="text--big">La partie commence dans</div>
        <div v-else class="text--big">Prochaine question dans</div>
        <div class="text--enormous text--bold">{{timer}}</div>
      </div>
      <div v-if="clue" class="clue">
        <img :src="'static/clue/' + clue + '.png'">
      </div>
      </div>
      <div v-else>
        <div class="text--huge">Réponses</div>
        <table class="text--medium">
          <tr v-for="question in questions" :key="question.answer">
            <td>{{question.answer}}</td>
          </tr>
        </table>
        <a href="javascript://" @click="replay()" class="button button--big">Rejouer</a>
        <br>
        <router-link to="/" class="button button--ghost button--big">Quitter</router-link>
      </div>
    </div>
</template>

<script>
import jsonCinema from '@/assets/data/cinema.json'
import jsonGeneral from '@/assets/data/general.json'
import jsonHistory from '@/assets/data/history.json'
import jsonSport from '@/assets/data/sport.json'
import jsonVideoGame from '@/assets/data/videogame.json'
import jsonQuestion from '@/assets/data/question.json'

var json = [].concat(jsonCinema, jsonGeneral, jsonHistory, jsonSport, jsonVideoGame, jsonQuestion)

var questions = json
questions = questions.sort(function () {
  return 0.5 - Math.random()
})

var maxQuestion = 10
var gameQuestions = questions.slice(0, maxQuestion)
var cursorQuestion = maxQuestion
var timer = false
var changeTime = 2000
var currentQuestion = 0
var currrentClue = 0
var maxClue = 5

export default {
  data () {
    return {
      gameRunning: false,
      gamePaused: false,
      questions: gameQuestions,
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
        var countdown = 5
        if (this.currentQuestion === 0) {
          countdown = 5
        }
        this.timer = countdown
        const timerInterval = setInterval(function () {
          if (!this.gamePaused) {
            if (this.timer === 0) {
              clearInterval(timerInterval)
              resolve()
            } else {
              this.timer = this.timer - 1
            }
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
          if (!this.gamePaused) {
            this.clue = this.questions[this.currentQuestion]['clues'][this.currrentClue]
            if (this.currrentClue === maxClue) {
              clearInterval(clueInterval)
              resolve()
            } else {
              this.currrentClue++
            }
          }
        }.bind(this), changeTime)
      })
    },
    replay () {
      this.questions = questions.slice(cursorQuestion, cursorQuestion + maxQuestion)
      cursorQuestion = cursorQuestion + maxQuestion
      this.currentQuestion = 0
      this.runGame()
    }
  },
  beforeMount () {
    this.runGame()
  }
}
</script>

<style>
  .text--medium {
    font-size: 1.5rem;
  }
  .text--big {
    font-size: 2rem;
  }
  .text--huge {
    font-size: 3rem;
  }
  .text--enormous {
    font-size: 5rem;
  }
  .text--bold {
    font-weight: bold;
  }

  .centered {
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9;
  }

  .pause {
    position: fixed;
    top: 10px;
    right: 10px;
  }

  .clue {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    position: fixed;
    top: 10%;
    bottom: 10%;
    left: 10%;
    right: 10%;
  }
  .clue img {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  table {
    width: 90%;
    margin: 20px auto;
    border-collapse: collapse;
  }
  table td {
    border: 1px solid;
  }

  .button {
    display: inline-block;
    background-color: #000;
    color: #fff;
    border: 1px solid #000;
    padding: 0.75em 2em;
    text-decoration: none;
    text-transform: uppercase;
    margin: 1em 0;
    font-size: 1.05em;
    font-weight: 600;
    letter-spacing: 0.1em;
    border-radius: 2em;
  }
  .button--ghost {
    border: 1px solid #000;
    background-color: transparent;
    color: #000;
  }

  .button--big {
    font-size: 1.5em;
  }
</style>
