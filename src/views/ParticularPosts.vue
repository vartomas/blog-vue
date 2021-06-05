<template>
  <Posts :search="this.$route.params.search" />
</template>

<script>
import Posts from '@/components/Posts'
export default {
  name: 'ParticularPosts',
  components: {
    Posts,
  },
}
</script>

<style scoped></style>
