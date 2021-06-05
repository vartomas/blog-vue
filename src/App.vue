<template>
  <div id="app">
    <div class="container p-0">
      <NavBar :user="user" @logout="logout" />
      <router-view :key="$route.path" @login="value => (this.user = value)" />
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
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user')) || null
  },
  methods: {
    logout() {
      localStorage.clear()
      this.user = null
    },
  },
}
</script>

<style scoped></style>
