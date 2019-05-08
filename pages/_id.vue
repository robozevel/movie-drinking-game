<template>
  <main>
    <header>
      <h1><router-link to="/">LET'S GET SHITFACED 🍻</router-link></h1>
    </header>
    <movie-search v-model="imdbId" />
    <template v-if="results">
      <h2>{{ movie.title }}</h2>
      <words-table :results="results" :key="imdbId" />
    </template>
  </main>
</template>

<script>
import MovieSearch from '@/components/MovieSearch'
import WordsTable from '@/components/WordsTable'

import parseSubtitles from '@/utils/subtitles/parse'
import fetchSubtitles from '@/utils/subtitles/fetch'
import getMovieSuggestions from '@/utils/imdb'

export default {
  components: {
    MovieSearch,
    WordsTable
  },
  params: {
    id: null
  },
  data () {
    return {
      subtitles: null,
      movie: null
    }
  },
  async asyncData ({ params }) {
    const [ movie ] = params.id ? await getMovieSuggestions(params.id) : []
    const subtitles = params.id ? await fetchSubtitles(params.id) : null
    return { subtitles, movie }
  },
  computed: {
    imdbId: {
      get () {
        return this.$route.params.id
      },
      set (id) {
        this.$router.push(id || '')
      }
    },
    options () {
      return {
        minCount: 3,
        maxCount: 12,
        minDiff: 2
      }
    },
    results () {
      if (!this.subtitles) return
      return parseSubtitles(this.subtitles, this.options)
    }
  },
  head () {
    const { image, title } = Object(this.movie)
    const { BASE_URL } = process.env

    const meta = []

    if (BASE_URL) meta.push({ hid: 'og:url', property: 'og:url', content: `${BASE_URL}/${this.imdbId || ''}` })

    if (title) {
      const description = `${title} Drinking Game`
      meta.push(
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', property: 'og:description', content: description }
      )
    }

    if (image) meta.push(
      { hid: 'og:image', property: 'og:image', content: image.imageUrl },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/jpeg' },
      { hid: 'og:image:height', property: 'og:image:height', content: image.height },
      { hid: 'og:image:width', property: 'og:image:width', content: image.width }
    )

    return { meta }
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

h2 {
  margin: .4em 0;
  text-align: center;
}
</style>

<style>
body {
  background-color: #f0f0f0;
  font-size: calc(16px + (32 - 16) * ((100vw - 300px) / (1600 - 300)));
}
</style>