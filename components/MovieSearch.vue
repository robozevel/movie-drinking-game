<template>
  <autocomplete ref="autocomplete" v-model="result" :placeholder="placeholder" :title="title" :search="search" autofocus>
    <template slot-scope="{ result, activeResult }">
      <result-wrapper class="result" :class="{ active: result === activeResult }">
        <div class="title">{{ result.title }}</div>
        <div class="subtitle">{{ result.subtitle }}</div>
      </result-wrapper>
    </template>
  </autocomplete>
</template>

<script>
import Autocomplete from '@/components/Autocomplete'
import ResultWrapper from '@/components/ResultWrapper'
import getMovieSuggestions from '@/utils/imdb'

export default {
  name: 'MovieSearch',
  components: {
    Autocomplete,
    ResultWrapper
  },
  props: {
    value: null
  },
  computed: {
    title () {
      return 'Search movie'
    },
    placeholder () {
      return this.title
    },
    result: {
      get () {
        return this.value
      },
      set (result) {
        this.$emit('input', result ? result.id : null)
      }
    }
  },
  methods: {
    async search (query) {
      return query ? await getMovieSuggestions(query) : []
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}

.subtitle {
  font-size: 10px;
  line-height: 20px;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>