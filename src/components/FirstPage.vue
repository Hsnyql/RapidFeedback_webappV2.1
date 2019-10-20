<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4">
        <div class="part">
          <b-link to="/AssessmentPreparation/Menu">AssessmentPreparation</b-link>
        </div>
      </b-col>
      <b-col cols="4">
        <div class="part">
          <b-link to="/RealTimeAssessment/Menu">Real-time Assessment</b-link>
        </div>
      </b-col>
      <b-col cols="4">
        <div class="part">
          <b-link>Review and Report</b-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {}
}

</script>

<style scoped>
.part {
  background: #094183;
  color: white;
  height: 300px
}
</style>
