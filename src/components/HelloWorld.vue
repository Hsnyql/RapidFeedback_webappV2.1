<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
      >
      This alert will dismissed in {{ dismissCountDown }} seconds.
    </b-alert>
    <b-button @click="showAlert">ShowAlert</b-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      dismissCountDown: 0,
      dismissSec: 5
    }
  },
  methods: {
    showAlert () {
      this.dismissCountDown = this.dismissSec
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
