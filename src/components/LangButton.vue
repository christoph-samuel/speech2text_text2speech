<template>
  <md-button class="md-layout-item md-dense md-raised md-primary md-size-10" @click="setLang(lang)">{{
      lang
    }}
  </md-button>
</template>

<script>
export default {
  name: "LangButton",

  props: {
    lang: {
      type: String,
      required: true
    }
  },

  methods: {
    setLang(value) {
      this.$emit('setLang', value)
    }
  }
}
</script>

<style scoped>

</style>