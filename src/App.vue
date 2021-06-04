<template>
  <div id="app">
    <div class="container p-0">
      <NavBar />
      <router-view @login="handleLogin" @register="handleRegister" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      user: null,
    }
  },
  methods: {
    async handleLogin(inputs) {
      const response = await fetch('http://167.99.138.67:1111/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      const data = await response.json()
      if (data.success) {
        this.user = {
          name: inputs.name,
          secretKey: data.secretKey,
        }
        localStorage.setItem('user', this.user)
        this.$router.push('/')
      }
    },
    async handleRegister(inputs) {
      const response = await fetch('http://167.99.138.67:1111/createaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      const data = await response.json()
      if (data.success) {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style scoped></style>
