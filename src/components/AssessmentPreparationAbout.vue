<template>
    <b-container fluid>
        <b-row><b-col><h1>About</h1><hr></b-col></b-row>
        <b-row>
            <b-col>
                <b-form>
                    <b-row>
                        <b-col cols="9">
                            <b-form-group id="ProjectName" label="Project Name:" label-for="projectname-input">
                                <b-form-input id="projectname-input" type="text" required
                                              placeholder="Enter Project Name"></b-form-input>
                            </b-form-group>
                            <b-form-group id="SubjectName" label="Subject Name:" label-for="subjectname-input">
                                <b-form-input id="subjectname-input" type="text" required
                                              placeholder="Enter Subject Name"></b-form-input>
                            </b-form-group>
                            <b-form-group id="SubjectCode" label="Subject Code:" label-for="subjectcode-input">
                                <b-form-input id="subjectcode-input" type="text" required
                                              placeholder="Enter Subject Code"></b-form-input>
                            </b-form-group>
                            <b-form-group id="Duration" label="Duration:" label-for="duration-input">
                                <b-form-input id="duration-input" type="number" required
                                              placeholder="Enter Duration"></b-form-input>
                            </b-form-group>
                            <b-form-group id="Warning" label="Warning:" label-for="warning-input">
                                <b-form-input id="warning-input" type="number" required
                                              placeholder="Enter Warning"></b-form-input>
                            </b-form-group>
                            <b-form-group id="ProjectDescription" label="Project Description:"
                                          label-for="projectdescription-input">
                                <b-form-input id="projectdescription-input" type="text"
                                              placeholder="Enter Project Description"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-row align-h="center">
                                <b-col cols="4">
                                    <b-button variant="primary">Save</b-button>
                                </b-col>
                                <b-col cols="4">
                                    <b-button variant="primary" to="/AssessmentPreparation/Criteria">Next</b-button>
                                </b-col>
                                <b-col></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'AssessmentPreparationAbout'
}
</script>

<style scoped>

</style>
