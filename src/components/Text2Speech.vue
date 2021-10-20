<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">Text 2 Speech</div>
      </md-card-header>

      <md-card-content>
        <div id="input">
          <md-field>
            <label>Text wird gesprochen ausgeben</label>
            <md-input v-model="input" placeholder="Enter Text..."></md-input>
          </md-field>
          <md-button class="md-icon-button md-raised md-primary" @click="text2speech">
            <md-icon>play_arrow</md-icon>
          </md-button>
        </div>

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
      languages: [],
      fromLanguage: "en",
      toLanguage: "de"
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
      console.log(lang)
      this.toLanguage = lang
    },

    setFromLang(lang) {
      this.fromLanguage = lang
    },

    text2speech() {
      translate(this.input, this.fromLanguage, this.toLanguage)
          .then(response => {
            this.output = response
            let utterance = new SpeechSynthesisUtterance(this.output)
            utterance.lang = this.toLanguage
            speechSynthesis.speak(utterance)
          })
    },
  }
}
</script>

<style>
#input {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>