<template>
    <b-container fluid id="wrapper">
        <b-row align-content="center" align-h="center">
            <b-col cols="3" >
                <b-row><b-col><h4>Criteria List</h4><hr></b-col></b-row>
                <b-row>
                    <b-form-group label="select criteria from the list">
                        <b-form-checkbox
                            v-for="criterion in criteria"
                            v-model="selected"
                            :key="criterion.value"
                            :value="criterion.value"
                            name="criteria pool"
                        >
                            {{ criterion.text }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-row>
            </b-col>
            <b-col cols="3">
                <b-row><b-col><h4>Marking Criteria</h4><hr></b-col></b-row>

                <b-row>
                    <p class="w-100">selected criteria will display below</p>
                    <ul id="selected criteria">
                        <li v-for="criterion in selected" :key="criterion">
                            {{ criterion }}
                        </li>
                    </ul>
                    <!-- <b-card-group>
                        <b-card no-body header="selected criteria">
                            <b-list-group flush>
                            <b-list-group-item href="#">Cras justo odio</b-list-group-item>
                            <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
                            <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
                            </b-list-group>

                            <b-card-body>
                            instructions instructions instructions instructions
                            </b-card-body>
                        </b-card>
                    </b-card-group> -->
                </b-row>
            </b-col>
            <b-col cols="3">
                <b-row><b-col><h4>Comment Only</h4><hr></b-col></b-row>
                <b-row id="comment-form">
                    <b-form-group id="positive" label="positive" label-for="pos-input">
                        <b-form-input id="pos-input" type="text" required
                            placeholder="Enter comment" v-model="comment"></b-form-input>
                    </b-form-group>
                    <b-form-group id="neutral" label="neutral" label-for="neu-input">
                        <b-form-input id="neu-input" type="text" required
                            placeholder="Enter comment" v-model="comment"></b-form-input>
                    </b-form-group>
                    <b-form-group id="negative" label="negative" label-for="neg-input">
                        <b-form-input id="neg-input" type="text" required
                            placeholder="Enter comment" v-model="comment"></b-form-input>
                    </b-form-group>
                </b-row>
            </b-col>
        </b-row>
        <b-row align-h="center" class="btns">
            <b-col cols="3">
                <b-button variant="primary" to="/AssessmentPreparation/About">Back</b-button>
            </b-col>
            <b-col cols="3">
                <b-button variant="primary" to="/AssessmentPreparation/Grading">Next</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'AssessmentPreparationCriteria',
  data () {
    return {
      selected: [],
      criteria: [
        {text: 'Fluency', value: 'fluency'},
        {text: 'Clarity', value: 'clarity'},
        {text: 'Consistency', value: 'consistency'},
        {text: 'Facial expression', value: 'expression'},
        {text: 'Body language', value: 'gesture'}
      ]
    //   comment: [
    //     {text: posComment, value: ''},
    //     {text: neuComment, value: ''},
    //     {text: negComment, value: ''}
    //   ]
    }
  },
  methods: {},
  computed: {}
}
</script>

<style scoped>
.btns{
    margin-top:50px;
}

#negative, #positive, #neutral{
    padding: 0;
    margin-bottom: 3px;
    width: 100%;
}

</style>
