<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">Speech 2 Text</div>
      </md-card-header>

      <md-card-content>
        <md-button class="md-icon-button md-raised md-primary" @click="speech2text">
          <md-icon>mic</md-icon>
        </md-button>

        <p v-if="message.length !== 0">{{ message }}</p>

        <p>
          <strong>Input ({{ fromLanguage }}):</strong> {{ input }}
          <br>
          <strong>Output ({{ toLanguage }}):</strong> {{ output }}
        </p>

        <div class="md-layout">
          <p><strong>From: </strong></p>
          <lang-button v-for="item in languages" v-bind:lang="item.code" :key="item.name" @setLang="setFromLang"/>
        </div>

        <div class="md-layout">
          <p><strong>To: </strong></p>
          <lang-button v-for="item in languages" v-bind:lang="item.code" :key="item.name" @setLang="setToLang"/>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import LangButton from '@/components/LangButton'
import {translate, getLanguages} from '@/services/translate'

export default {
  name: "Text2Speech",

  components: {
    LangButton
  },

  data() {
    return {
      input: "",
      output: "",
      message: "",
      languages: [],
      fromLanguage: "de",
      toLanguage: "en"
    }
  },

  created() {
    this.getLanguages()
  },

  methods: {
    getLanguages() {
      getLanguages().then(response => {this.languages = response.data})
    },

    setToLang(lang) {
      this.toLanguage = lang
    },

    setFromLang(lang) {
      this.fromLanguage = lang
    },

    speech2text() {
      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      // var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
      // var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

      var recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.lang = this.fromLanguage
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.start()
      this.message = (this.fromLanguage === "de") ? "Bitte sprechen..." : "Speak now..."
      console.log('Ready to receive a command.')

      var newThis = this

      recognition.onresult = function (event) {
        var text = event.results[0][0].transcript
        newThis.input = text

        translate(text, newThis.fromLanguage, newThis.toLanguage)
            .then(response => {
              newThis.output = response
              newThis.message = ""

              let utterance = new SpeechSynthesisUtterance(newThis.output)
              utterance.lang = newThis.toLanguage
              speechSynthesis.speak(utterance)
            })
      }

      recognition.onspeechend = function () {
        this.message = ""
        recognition.stop()
      }

      recognition.onerror = function (event) {
        this.message = ""
        console.log('Error occurred in recognition: ', +event.error)
      }
    }
  }
}
</script>

<style>

</style>