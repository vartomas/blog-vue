<template>
  <div class="container">
    <div>
      <button class="btn btn-outline-secondary m-1" @click="sortByDate">Sort by date</button>
      <button class="btn btn-outline-secondary m-1" @click="sortByUser">Sort by user</button>
    </div>
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
      this.posts = data
    },
    async getPostsWithoutSearch() {
      const response = await fetch('http://167.99.138.67:1111/getallposts')
      let { data } = await response.json()
      this.posts = data
    },
    sortByDate() {
      this.posts = this.posts.sort((a, b) => b.timestamp - a.timestamp)
    },
    sortByUser() {
      this.posts = this.posts.sort((a, b) => {
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
          return -1
        }
        if (a.username.toLowerCase() > b.username.toLowerCase()) {
          return 1
        }
        return 0
      })
    },
  },
}
</script>
