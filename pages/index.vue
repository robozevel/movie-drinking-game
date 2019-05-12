<template>
  <main>
    <header>
      <h1><router-link to="/">LET'S GET SHITFACED 🍻</router-link></h1>
    </header>
    <movie-search v-model="imdbId" />
    <nuxt-child />
  </main>
</template>

<script>
import MovieSearch from '@/components/MovieSearch'

export default {
  components: {
    MovieSearch
  },
  computed: {
    imdbId: {
      get () {
        return this.$route.params.id
      },
      set (id) {
        this.$router.push(id || '')
      }
    }
  }
}
</script>

<style scoped>
main {
  max-width: 40em;
  margin: 0 auto;
  padding: 0 .5em .5em .5em;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em .4em;
}

h1 {
  font-size: 1em;
}

p.lead {
  color: #999;
  padding: 1em .4em;
  line-height: 1.5;
}
</style>