<template>
  <main>
    <header>
      <h1><router-link to="/" class="title">LET'S GET SHITFACED</router-link></h1>
    </header>
    <movie-search v-model="imdbId" />
    <transition name="fade" mode="out-in">
      <nuxt-child v-if="imdbId" :key="imdbId" />
      <p class="lead" v-else-if="suggestion" :class="{ hidden: !showSuggestion }">
        Try <router-link class="suggestion" :to="`/${suggestion.id}`">{{ suggestion.name }}</router-link>
      </p>
    </transition>
    <footer>Made by <a href="https://guy.is" rel="noopener">Guy Levi</a></footer>
  </main>
</template>

<script>
import MovieSearch from '@/components/MovieSearch'

export default {
  components: {
    MovieSearch
  },
  data () {
    return {
      showSuggestion: false,
      suggestion: null,
      suggestions: [
        { id: 'tt0374900', name: 'Napoleon Dynamite (2004)' },
        { id: 'tt0091042', name: 'Ferris Bueller\'s Day Off (1986)' },
        { id: 'tt0196229', name: 'Zoolander (2001)' },
        { id: 'tt0092099', name: 'Top Gun (1986)' },
        { id: 'tt0117571', name: 'Scream (1996)' },
        { id: 'tt0357413', name: 'Anchorman (2004)' },
        { id: 'tt0087800', name: 'A Nightmare on Elm Street (1984)' },
        { id: 'tt0204946', name: 'Bring It On (2000)' },
        { id: 'tt0368226', name: 'The Room (2003)' },
        { id: 'tt0993846', name: 'The Wolf of Wall Street (2013)' },
        { id: 'tt0120737', name: 'The Lord of the Rings: The Fellowship of the Ring (2001)' },
        { id: 'tt0446029', name: 'Scott Pilgrim vs. the World (2010)' },
        { id: 'tt0106677', name: 'Dazed and Confused (1993)' },
        { id: 'tt0107290', name: 'Jurassic Park (1993)' },
        { id: 'tt0232500', name: 'The Fast and the Furious (2001)' },
        { id: 'tt0120812', name: 'Rush Hour (1998)' },
        { id: 'tt0120669', name: 'Fear and Loathing in Las Vegas (1998)' },
        { id: 'tt0105236', name: 'Reservoir Dogs (1992)' }
      ]
    }
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
  },
  mounted () {
    this.showSuggestion = true
  },
  watch: {
    imdbId: {
      immediate: true,
      handler () {
        const i = Math.floor(Math.random() * (this.suggestions.length - 1))
        this.suggestion = this.suggestions[i]
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