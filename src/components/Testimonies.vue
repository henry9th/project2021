<template>
  <div id="card">
    <h1 class="title">Testimonies</h1>
    <button id="new-button" @click="this.$router.push('/careers/' + career + '/new-testimony');" v-if="this.user !== null && typeof this.user !== undefined" >New</button>
  
    <br/>
    
    <TCard class="tcard" v-for="item in this.testimonies" :testimony="item" :key="item" />
  </div>
</template>

<script>
import TCard from '@/components/TCard.vue'
import axios from "axios";

export default {
  name: "LoginForm",
  props: { 
    stories: Array
  },
  data () {
      return {
        career: this.$router.currentRoute._value.params.careerName,
        user: null,
        testimonies: Array
      }
  },
  beforeMount(){
    // eventually we will fetch from the server user-input details of the career
    this.user = this.$cookie.getCookie("user");

    axios.get(`http://localhost:8081/getTestimonies?career=${this.career.toLowerCase()}`, {
      withCredentials: true,
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      if (res.status === 200) { 
          this.testimonies = res.data;
          console.log(this.testimonies)
      }
    }).catch(err => {
      console.log(err);
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
 components: {
   TCard
 }
};
</script>


<style scoped>
.title { 
    margin-bottom: 5%;
    display: inline;
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

#card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.tcard { 
  display: block;
}

#new-button { 
  float: right;
}

</style>
