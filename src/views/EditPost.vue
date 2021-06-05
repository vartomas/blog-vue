<template>
  <CreateNewEditPost :author="this.$route.params.author" :postId="this.$route.params.id" />
</template>

<script>
import CreateNewEditPost from '@/components/CreateNewEditPost'
export default {
  name: 'EditPost',
  components: {
    CreateNewEditPost,
  },
}
</script>
