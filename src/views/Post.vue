<template>
  <SinglePost :postAuthor="this.$route.params.author" :postId="this.$route.params.id" />
</template>

<script>
import SinglePost from '@/components/SinglePost'
export default {
  name: 'Post',
  components: {
    SinglePost,
  },
}
</script>
