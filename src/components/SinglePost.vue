<template>
  <div class="container mt-3">
    <img :src="post.image" class="image rounded float-start m-2" alt="Post image" />
    <h2 class="text-center mt-5">{{ post.title }}</h2>
    <p class="text-center mt-3 lh-sm">{{ post.description }}</p>
    <p class="m-0">
      <small>Author: {{ author(post.username) }}</small>
    </p>
    <p class="m-0">
      <small>Created: {{ formatDate(post.timestamp) }}</small>
    </p>
  </div></template
>

<script>
export default {
  name: 'SinglePost',
  props: ['postAuthor', 'postId'],
  data() {
    return {
      post: {},
    }
  },
  async mounted() {
    const response = await fetch(
      `http://167.99.138.67:1111/getsinglepost/${this.postAuthor}/${this.postId}`
    )
    const data = await response.json()
    this.post = data.data
  },
  methods: {
    handleGoBack() {
      console.log(this.$router)
      // this.$router.push(this.$route.from.path)
    },
    formatDate(date) {
      const yyyy = new Date(date).getFullYear()
      const mm = String(new Date(date).getMonth() + 1)
      const dd = String(new Date(date).getDate())
      const hh = String(new Date(date).getHours())
      const mn = String(new Date(date).getMinutes())
      return `${yyyy}-${mm.length === 1 ? '0' + mm : mm}-${dd.length === 1 ? '0' + dd : dd} ${
        hh.length === 1 ? '0' + hh : hh
      }:${mn.length === 1 ? '0' + mn : mn}`
    },
    author(username) {
      // cia patikrinu ar postas mano, jeigu as prisijugnes
      const user = () => JSON.parse(localStorage.getItem('user')) || null
      if (!user()) return username
      return username === user().name ? 'You' : username
    },
  },
}
</script>

<style scoped>
.image {
  width: 30%;
}
</style>
