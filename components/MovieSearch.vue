<template>
  <autocomplete
    ref="autocomplete"
    v-model="selected"
    :placeholder="placeholder"
    :title="title"
    :search="search"
    autofocus
  >
    <template slot-scope="{ result, activeResult }">
      <result-wrapper class="result" :class="{ active: result === activeResult }">
        <div class="title">
          {{ result.title }}
        </div>
        <div class="subtitle">
          {{ result.subtitle }}
        </div>
      </result-wrapper>
    </template>
  </autocomplete>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Autocomplete from '@/components/Autocomplete.vue'
import ResultWrapper from '@/components/ResultWrapper.vue'
import getMovieSuggestions from '@/utils/imdb'
import { Movie } from '@/models'

@Component({
  components: {
    Autocomplete,
    ResultWrapper
  }
})
export default class MovieSearch extends Vue {
  @Prop() value? : Movie

  get title() {
    return 'Search movie'
  }

  get placeholder() {
    return this.title
  }

  get selected() {
    return this.value
  }

  set selected(result) {
    this.$emit('input', result ? result.id : null)
  }

  search(query) {
    return query ? getMovieSuggestions(query) : []
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
