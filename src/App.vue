<template>
  <div id="app">
    <md-app
        v-cloak
        md-waterfall
        md-mode="fixed"
    >
      <md-app-toolbar class="md-primary md-dense">
        <div class="md-toolbar-section-start">
          Text to Speech to Text
        </div>
      </md-app-toolbar>

      <md-app-content class="md-layout">
        <Text2Speech class="card md-layout-item"/>
        <Speech2Text class="card md-layout-item"/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Text2Speech from '@/components/Text2Speech'
import Speech2Text from '@/components/Speech2Text'

export default {
  name: 'App',

  components: {
    Text2Speech,
    Speech2Text
  }
}
</script>

<style>
.card {
  margin: 10px;
}
</style>
