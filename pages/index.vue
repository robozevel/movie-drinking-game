<template>
  <main>
    <header>
      <h1><router-link to="/" class="title">LET'S GET SHITFACED</router-link></h1>
    </header>
    <movie-search v-model="imdbId" />
    <transition name="fade" mode="out-in">
      <nuxt-child v-if="imdbId" :key="imdbId" />
      <p class="lead" v-else>
        Try: <br />
        <router-link class="suggestion" to="/tt0374900">Napoleon Dynamite (2004)</router-link>
        <router-link class="suggestion" to="/tt0091042">Ferris Bueller's Day Off (1986)</router-link>
        <router-link class="suggestion" to="/tt0095016">Die Hard (1988)</router-link>
      </p>
    </transition>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

a.title::after {
  content: '🍻';
  display: inline-block;
  margin-left: .3em;
  transition: transform .4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

a.title:hover::after {
  transform: scale(1.4) rotateZ(12deg);
}

a.suggestion {
  transition: color .2s ease-in;
  color: #f4900c;
  display: block;
}

a.suggestion:hover {
  color: #fa743e;
}
</style>