<template>
  <div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
  methods: {},
};
</script>

<style scoped>
#title {
  margin-top: 3%;
}

#paragraph {
  margin: 5% 20%;
}
</style>
