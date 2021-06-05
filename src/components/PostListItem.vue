<template>
  <div class="card mt-3 shadow-sm">
    <div class="row g-0">
      <div class="col-md-4">
        <div class="image" :style="{ backgroundImage: `url('${post.image}')` }"></div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title text-truncate">{{ post.title }}</h5>
          <p class="card-text text-truncate">
            {{ post.description }}
          </p>
          <p class="card-text mb-0">
            <small class="text-muted">
              Author: <b>{{ author(post.username) }}</b></small
            >
          </p>
          <p class="card-text">
            <small class="text-muted"
              >Created: <b>{{ formatDate(post.timestamp) }}</b></small
            >
          </p>
          <button type="button" class="btn btn-outline-primary" @click="handleReadBtn">
            Read more
          </button>
          <button
            type="button"
            class="btn btn-outline-warning mx-3"
            v-if="author(post.username) === 'You'"
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            data-bs-toggle="modal"
            :data-bs-target="`#deletePostModal${post.id}`"
            v-if="author(post.username) === 'You'"
          >
            Delete
          </button>
          <!-- Post delete modal -->
          <div
            class="modal fade"
            :id="`deletePostModal${post.id}`"
            tabindex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteModalLabel">Delete post?</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {{ post.title }}
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    @click="handleDelete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostListItem',
  props: ['post'],
  methods: {
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
    async handleDelete() {
      const user = () => JSON.parse(localStorage.getItem('user')) || null
      if (user()) {
        const secretKey = user().secretKey
        const response = await fetch('http://167.99.138.67:1111/deletepost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ secretKey, id: this.post.id }),
        })
        const data = await response.json()
        if (data.success) {
          this.$emit('handleDelete')
        }
      }
    },
    handleReadBtn() {
      this.$router.push(`/post/${this.post.username}/${this.post.id}`)
    },
  },
}
</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
</style>
