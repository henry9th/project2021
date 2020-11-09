<template>
  <div id="card">
    <h1>Login</h1>

    <div id="login-inputs" v-if="formType==='login'">
      <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
      <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter Password">
    </div>

    <div id="register-inputs" v-else>
      <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter Password">
      <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Confirm Password">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button> 

    <span class="link" @click="switchForm" v-if="formType==='login'"> Don't have an account?</span>
    <span class="link" @click="switchForm" v-if="formType==='register'"> Already have an account?</span>
  </div>

  
</template>

<script>
export default {
  name: "LoginForm",
  methods: {
      switchForm() { 
          if (this.formType === 'login') {
              this.formType = 'register'
          } else { 
              this.formType = 'login'
          }
      }
  },
  data() {
      return {
          formType: 'login'
      }
  }
};
</script>


<style scoped>
#card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 60%;
  margin: auto;
  padding: 3%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-left: 1.5%;
  margin-right: 1.5%;
  margin-top: 3%;
}

#card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.form-control {
    width: 60%;
    margin: 3% auto;

}

.btn-primary { 
    display: block;
    margin: auto;
    margin-top: 30px;
    width: 60%;
    margin-bottom: 10px;
}

.link:hover { 
    text-decoration: underline;
    cursor: pointer;
}

</style>
