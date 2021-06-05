<template>
  <div class="container mt-3">
    <img :src="post.image" class="image rounded float-start m-2" alt="Post image" />
    <h2 class="text-center mt-5">{{ post.title }}</h2>
    <p class="text-center mt-3 lh-sm">{{ post.description }}</p>
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
}
</script>

<style scoped>
.image {
  width: 30%;
}
</style>
