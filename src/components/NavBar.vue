<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Blog</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex me-auto mb-2 mt-4 mb-lg-0 mt-lg-0" @submit.prevent="handleSearch">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Find posts by user name"
              aria-label="Search"
              v-model="search"
            />
            <button class="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/createpost">
                Create post
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                :to="`/particularposts/${user.name}`"
              >
                My Posts
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav me-1 mb-2 mb-lg-0" v-if="!user">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/login">
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/register">
                Register
              </router-link>
            </li>
          </ul>
          <div v-if="user" class="d-flex align-items-center mb-2 mb-lg-0">
            <p class="m-0 me-2 flex-grow-1">{{ user.name }}</p>
            <button class="btn btn-outline-danger me-1" @click="$emit('logout')">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['user'],
  data() {
    return {
      search: '',
    }
  },
  methods: {
    handleSearch() {
      this.$router.push(`/particularposts/${this.search}`).catch(error => {
        if (
          error.name !== 'NavigationDuplicated' &&
          !error.message.includes('Avoided redundant navigation to current location')
        ) {
          console.log(error)
        }
      })
    },
  },
}
</script>
