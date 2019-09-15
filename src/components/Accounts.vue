<template>
    <b-container fluid>
        <b-row align-h="center"><h1>Signup Page</h1></b-row>
        <b-row align-h="center">
            <b-col cols="6">
                <b-form>
                    <b-form-group id="account" label="Email:" label-for="account-input">
                        <b-form-input id="account-input" type="email" required placeholder="Enter Email"></b-form-input>
                    </b-form-group>
                    <b-form-group id="firstname" label="First Name:" label-for="firstname-input">
                        <b-form-input id="firstname-input" type="text" required placeholder="Enter First Name">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="middlename" label="First Name:" label-for="middlename-input">
                        <b-form-input id="middlename-input" type="text" placeholder="Enter Middle Name">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="lastname" label="First Name:" label-for="lastname-input">
                        <b-form-input id="lastname-input" type="text" required placeholder="Enter Last Name">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="password" label="Password:" label-for="password-input-1">
                        <b-form-input id="password-input-1" type="password" required placeholder="Enter Password"></b-form-input>
                    </b-form-group>
                    <b-form-group id="password" label="Confirm Password:" label-for="password-input-2">
                        <b-form-input id="password-input-2" type="password" required placeholder="Enter Password"></b-form-input>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="3">
                <b-row align-h="center">
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-row>
            </b-col>
            <b-col cols="3">
                <b-row align-h="center">
                    <b-button type="clear" variant="danger">Clear</b-button>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Signup'
}
</script>

<style scoped>

</style>
