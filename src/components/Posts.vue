<template>
  <div class="container d-flex flex-column-reverse">
    <PostListItem v-for="post in posts" :key="post.id" :post="post" @handleDelete="getPosts()" />
  </div>
</template>

<script>
import PostListItem from '@/components/PostListItem'
export default {
  name: 'Posts',
  props: ['search'],
  components: {
    PostListItem,
  },
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      if (this.search) {
        this.getPostsWithSearch()
      } else {
        this.getPostsWithoutSearch()
      }
    },
    async getPostsWithSearch() {
      const response = await fetch(`http://167.99.138.67:1111/getuserposts/${this.search}`)
      let { data } = await response.json()
      this.posts = data.sort((a, b) => a.timestamp - b.timestamp)
    },
    async getPostsWithoutSearch() {
      const response = await fetch('http://167.99.138.67:1111/getallposts')
      let { data } = await response.json()
      this.posts = data.sort((a, b) => a.timestamp - b.timestamp)
    },
  },
}
</script>

<style scoped></style>
