<template>
  <words-table :results="results" v-if="movie">
    <template v-slot:caption>
      <h2>{{ movie.title }}</h2>
    </template>
  </words-table>
</template>

<script>
import WordsTable from '@/components/WordsTable'

import parseSubtitles from '@/utils/subtitles/parse'
import fetchSubtitles from '@/utils/subtitles/fetch'
import getMovieSuggestions from '@/utils/imdb'

export default {
  components: {
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

    if (BASE_URL) meta.push({ hid: 'og:url', property: 'og:url', content: `${BASE_URL}/${this.$route.path || ''}` })

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
h2 {
  margin: .4em 0;
  text-align: center;
}
</style>