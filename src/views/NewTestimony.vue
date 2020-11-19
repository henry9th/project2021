<template>
  <div id="title">
      <h1> New Testimony about {{ career }} </h1>
      
  </div>

  <div id="card" class="container">
    <form v-on:submit.prevent="onSubmit"> 
        <div class="row">
            <div class="col-1">
                <label for="title-input"> Title: </label>
            </div>

            <div class="col-lg">
                <input
                    id="title-input"
                    type="text"
                    class="form-control"
                    placeholder="Just a one liner here!"
                    v-model="testimonyTitle"
                />
            </div>
        </div>

        <div class="row">
            <div class="col-1">
                <label for="body-input"> Body: </label>
            </div> 

            <div class="col-lg">
                <textarea 
                    id="body-input"
                    name="paragraph_text" 
                    rows="10"
                    class="form-control"
                    placeholder="This is where you write about your experience in getting the job and how you enjoy it now!"
                    v-model="testimonyBody"
                />
            </div>
        </div>
        
        <div class="row"> 
            <div class="col-1" />
            <div class="col-lg">
                <button
                    type="submit"
                    class="btn btn-primary"
                    @click="submitTestimony"
                    >
                        Submit
                </button>
            </div>
        </div>
    </form> 
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: 'NewTestimony',
  components: {
      
  },
  data () { 
      return {
          testimonyTitle: "",
          testimonyBody: "",
          career: this.$router.currentRoute._value.params.careerName,
      }
  },
  methods: {
      async submitTestimony() { 
        const data = {
            author: this.$cookie.getCookie("user"),
            title: this.testimonyTitle,
            body: this.testimonyBody, 
            career: this.career.toLowerCase()
        };

        axios.post("http://localhost:8081/uploadTestimony", data, {
          withCredentials: true,
          headers: { 'content-type': 'application/json' }
        }).then(res => {
            if (res.status === 200 && res.data === "success") { 
                this.$router.push("/careers/" + this.career);
            } 
        }).catch(err => {
            if (String(err).includes("401")) { 
                // not authorized 
                this.$cookie.setCookie("user", null); 
                this.$store.dispatch("signout");
                return;
            } 
            
            alert("Server error");
            console.log(err);
        });
      },
  }
} 
</script>

<style scoped>

#title { 
    margin-top: 3%;
}

#paragraph {
    margin: 5% 20%;
}

#card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 90%;
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

.form-control {
  width: 90%;
  margin: 3% auto;
  margin-top: 0%;
  display: inline;
}

.btn-primary {
  display: block;
  margin: auto;
  width: 90%;
  margin-bottom: 10px;
}

label { 
    font-weight: bold;
    margin-left: 50%;
}

#body-input { 
    vertical-align: top;
    margin-top: 0%;
}

</style>
