<template>
  <div class="container mt-3 me-auto">
    <h2>Create post</h2>
    <form @submit.prevent="handleCreate">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="inputs.title"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Img url</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="inputs.image"
        />
      </div>
      <label for="floatingTextarea2" class="form-label">Comments</label>
      <textarea
        class="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
        style="height: 400px"
        v-model="inputs.description"
      ></textarea>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <p class="text-danger fs-5 mt-3">{{ errorText }}</p>
        <button type="submit" class="btn-lg btn-primary m-3">Create Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateNewPost',
  data() {
    return {
      inputs: {
        title: '',
        description: '',
        image: '',
      },
      secretKey: '',
      errorText: '',
    }
  },
  mounted() {
    const user = () => JSON.parse(localStorage.getItem('user')) || null
    if (user()) {
      this.secretKey = user().secretKey
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async handleCreate() {
      this.errorText = ''
      const response = await fetch('http://167.99.138.67:1111/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...this.inputs, secretKey: this.secretKey }),
      })
      const data = await response.json()
      if (data.success) {
        this.$router.push('/')
      } else {
        this.errorText = data.message
      }
    },
  },
}
</script>

<style scoped></style>
