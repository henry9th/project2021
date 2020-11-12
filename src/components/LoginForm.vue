<template>
  <div id="card">
    <h1 class="title" v-if="formType === 'login'">Login</h1>
    <h1 class="title" v-else-if="!registrationSuccess">Register</h1>

    <div id="login-form" v-if="formType === 'login'">
      <input
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        v-model="email"
      />
      <input
        type="password"
        class="form-control"
        aria-describedby="emailHelp"
        placeholder="Enter Password"
        v-model="password"
      />

      <p id="error-message">{{ errorMsg }}</p>

      <button
        v-if="formType === 'login'"
        type="submit"
        class="btn btn-primary"
        @click="loginRequest"
      >
        Submit
      </button>
      <span class="link" @click="switchForm" v-if="formType === 'login'">
        Don't have an account?</span
      >
    </div>

    <div id="register-form" v-else-if="!registrationSuccess">
      <input
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        placeholder="Enter email"
        v-model="email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.
        </small>

      <input
        type="password"
        class="form-control"
        aria-describedby="passwordHelp"
        placeholder="Enter Password"
        v-model="password"
      />
      <small
        id="passwordHelp"
        class="form-text text-muted"
        v-if="formType === 'register'"
        >At least 7 characters and include at least one number, lower-case
        letter, and upper-case letter</small
      >
      <input
        type="password"
        class="form-control"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />

      <input type="checkbox" class="form-check-input" id="mentor-check" v-if="formType === 'register'" v-model="mentorCheck" />
      <label class="form-check-label" for="mentor-check" v-if="formType === 'register'">Are you signing up as a mentor?</label>
      
      <select 
        class="form-control" 
        v-if="mentorCheck" 
        placeholder="Your occupation"
        v-model="userCareer"
      >
        <option value="" disabled selected>Your occupation</option>
        <option v-for="career in this.careers" :key="career"> {{ career.name }} </option>
      </select>

      <p id="error-message">{{ errorMsg }}</p>

      <button
        v-if="formType === 'register'"
        type="submit"
        class="btn btn-primary"
        @click="registerRequest"
      >
        Submit
      </button>
      <span class="link" @click="switchForm" v-if="formType === 'register'">
        Already have an account?</span
      >
    </div>
      
    <div id="registration-success" v-else> 
      <h1 class="title">Successful registration! </h1>
      <p>Please check your email for a verification email. Click the link the email and your account will be verified! </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Careers from '@/json/careers.json'
var bcrypt = require('bcryptjs');

export default {
  name: "LoginForm",
  methods: {
    switchForm() {
      if (this.formType === "login") {
        this.formType = "register";
      } else {
        this.formType = "login";
      }
    },
    async registerRequest() {
      if (this.validateForm()) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(this.password, salt);

        const data = { 
            email: this.email,
            password: hash,
            userCareer: this.userCareer
        };
        let res = await axios.post("http://localhost:8081/register", data);

        if (res.status === 200 && res.data === "success") { 
          // registration was successful 
          this.registrationSuccess = true;
          return true;
        } else {
          // TODO handle bad registration such as duplicate email 
          return false; 
        }
      } else {
        return false;
      }
    },
    async loginRequest() {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)) { 
            this.errorMsg = "Please enter a valid email";
            return;
        }
        if (this.password.length < 7) { 
            this.errorMsg = "Please enter a valid password";
            return;
        }
        this.errorMsg = "";

        const data = {
            email: this.email, 
            password: this.password
        };
        let res = await axios.post("http://localhost:8081/login", data);

        if (res.status === 200 && res.data === "success") { 
          // log the user in 
          
          this.$router.push("/");
        } else if (res.status === 200 && res.data === "not_verified") { 
          // notify the user that they need to verify their email 

        }

        console.log(res)
    },
    validateForm() {
      if (this.mentorCheck && this.userCareer === "") { 
          this.errorMsg = "Please select an occupation. If nothing matches, select Other and we will reach out";
          return false; 
      }
      if (this.formType === "register") {
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            this.email
          )
        ) {
          if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,255}$/.test(this.password)) {
            if (this.password === this.confirmPassword) {
              this.errorMsg = "";
              return true;
            } else {
              this.errorMsg = "The passwords do not match";
              return false;
            }
          } else {
            this.errorMsg = "Please enter a valid password";
            return false;
          }
        } else {
          this.errorMsg = "Please enter a valid email";
          return false;
        }
      } else {
        // not bothering with input validation for login
        this.errorMsg = "";
        return true;
      }
    },
  },
  data() {
    return {
      formType: "login",
      email: "",
      password: "",
      confirmPassword: "",
      errorMsg: " ",
      mentorCheck: false,
      careers: Careers,
      userCareer: "",
      registrationSuccess: false, 
    };
  },
};
</script>


<style scoped>
.title { 
    margin-bottom: 5%;
}

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
  margin-top: 0;
  width: 60%;
  margin-bottom: 10px;
}

.link:hover {
  text-decoration: underline;
  cursor: pointer;
}

#error-message {
  color: red;
  display: block;
}
</style>
