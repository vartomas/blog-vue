<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-2">
        <label for="nameInput" class="form-label">Name</label>
        <input type="text" class="form-control" id="nameInput" v-model="inputs.name" />
      </div>
      <div class="mb-2">
        <label for="passwordInput" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          v-model="inputs.passwordOne"
        />
      </div>
      <div class="mb-2">
        <label for="repeatPasswordInput" class="form-label">Repeat password</label>
        <input
          type="password"
          class="form-control"
          id="repeatPasswordInput"
          v-model="inputs.passwordTwo"
        />
      </div>
      <p class="text-danger">{{ errorText }}</p>
      <button type="submit" class="btn btn-primary mt-2">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      inputs: {
        name: '',
        passwordOne: '',
        passwordTwo: '',
      },
      errorText: '',
    }
  },
  methods: {
    async handleRegister() {
      this.validateInputs()
      if (this.errorText) return
      const response = await fetch('http://167.99.138.67:1111/createaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.inputs.name,
          passwordOne: this.inputs.passwordOne,
          passwordTwo: this.inputs.passwordTwo,
        }),
      })
      const data = await response.json()
      if (data.success) {
        this.$router.push({ path: '/login', params: { registered: true } })
      }
    },
    validateInputs() {
      this.errorText = ''
      if (!this.inputs.name || !this.inputs.passwordOne || !this.inputs.passwordTwo)
        return (this.errorText = 'Please fill all fields')
      if (this.inputs.name.length < 5) {
        this.errorText = this.errorText + 'name must be at least 5 chars long, '
      }
      if (
        this.inputs.passwordOne !== this.inputs.passwordTwo ||
        this.inputs.passwordOne.length < 8 ||
        this.inputs.passwordTwo.length < 8
      ) {
        this.errorText = this.errorText + 'passwords must match and be at least 8 chars long, '
      }
      if (this.errorText) {
        // capitalize first letter
        this.errorText = this.errorText.charAt(0).toUpperCase() + this.errorText.slice(1)
        // cut comma in end
        this.errorText = this.errorText.substring(0, this.errorText.length - 2)
      }
    },
  },
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 24px auto;
}
</style>
