<template>
  <main>
    <header>
      <h1>
        <router-link to="/" class="title">
          LET'S GET SHITFACED
        </router-link>
      </h1>
    </header>
    <movie-search v-model="imdbId" />
    <transition name="fade" mode="out-in">
      <nuxt-child v-if="imdbId" :key="imdbId" />
      <p v-else-if="suggestion" class="lead" :class="{ hidden: !showSuggestion }">
        Try <router-link class="suggestion" :to="`/${suggestion.id}`">
          {{ suggestion.name }}
        </router-link>
      </p>
    </transition>
    <footer>Made by <a href="https://guy.is" rel="noopener">Guy Levi</a></footer>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import MovieSearch from '@/components/MovieSearch.vue'
import MOVIE_SUGGESTIONS from '@/utils/suggestions'

class Movie {
  id?: String
  name?: String
}

@Component({
  components: {
    MovieSearch
  }
})
export default class Index extends Vue {
  showSuggestion = false
  suggestion! : Movie
  suggestions : Movie[] = MOVIE_SUGGESTIONS

  get imdbId() {
    return this.$route.params.id
  }

  set imdbId(id) {
    this.$router.push(id || '')
  }

  @Watch('imdbId', { immediate: true })
  onImdbIdChange() {
    const i = Math.floor(Math.random() * (this.suggestions.length - 1))
    this.suggestion = this.suggestions[i]
  }

  mounted() {
    this.showSuggestion = true
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
  padding: 1em 0;
  text-align: center;
  line-height: 1.5;
}

p.lead.hidden {
  visibility: hidden;
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

footer a {
  color: #f4900c;
}

a.suggestion {
  transition: color .2s ease-in;
  color: #f4900c;
}

footer a:hover,
a.suggestion:hover {
  color: #fa743e;
}

footer {
  color: #999;
  font-size: 60%;
  font-weight: bold;
  text-transform: uppercase;
  margin: 2em 0 .5em;
  text-align: center;
}
</style>
