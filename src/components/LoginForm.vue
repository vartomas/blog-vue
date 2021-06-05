<template>
  <div class="login-form">
    <p class="text-success" v-if="$route.params.registered">
      You have registered successfully
    </p>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-2">
        <label for="nameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="nameInput" v-model="inputs.name" />
      </div>
      <div class="mb-2">
        <label for="passwordInput" class="form-label">Password</label>
        <input type="password" class="form-control" id="passwordInput" v-model="inputs.password" />
      </div>
      <p class="text-danger">{{ errorText }}</p>
      <button type="submit" class="btn btn-primary mt-2">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      errorText: '',
      inputs: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    async handleLogin() {
      const response = await fetch('http://167.99.138.67:1111/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.inputs.name, password: this.inputs.password }),
      })
      const data = await response.json()
      if (data.success) {
        const user = {
          name: this.inputs.name,
          secretKey: data.secretKey,
        }
        localStorage.setItem('user', JSON.stringify(user))
        this.$router.push('/')
        this.$parent.$emit('login', user)
      } else {
        this.errorText = data.message
      }
    },
  },
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 24px auto;
}
</style>
