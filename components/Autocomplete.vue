<template>
  <form novalidate @submit.prevent="select(activeResult)" @keydown.up.prevent="up" @keydown.down.prevent="down">
    <input type="search" :autofocus="autofocus" ref="input" class="autocomplete" @keyup.esc.stop.capture="clear" v-model.trim="query" :title="title" :placeholder="placeholder" pattern="\S+" minlength="1" required :disabled="disabled" />
    <span class="loader" :class="{ visible: showLoader }"></span>
    <span class="count" v-if="showCount">{{ resultsCountLabel }}</span>
    <ol class="results" :style="{ '--results-count': visibleResultsCount }">
      <li v-for="result in results" @click="select(result)" :key="result.id" ref="results">
        <slot :result="result" :active-result="activeResult" />
      </li>
    </ol>
  </form>
</template>

<script>
import { debounce, size } from 'lodash'

export default {
  name: 'Autocomplete',
  props: {
    search: {
      type: Function,
      required: true
    },
    title: String,
    placeholder: String,
    autofocus: Boolean,
    disabled: Boolean,
    loading: Boolean,
    initial: String,
    showCount: Boolean,
    allowEmpty: Boolean,
    value: null
  },
  data () {
    return {
      searching: false,
      activeResult: null,
      query: this.initial,
      results: null
    }
  },
  computed: {
    visibleResultsCount () {
      return Math.min(this.resultsCount, 5)
    },
    resultsCount () {
      return size(this.results)
    },
    resultsCountLabel () {
      if (!this.results) return
      return `${this.resultsCount} ${this.resultsCount > 1 ? 'results' : 'result'}`
    },
    scrollNeeded () {
      return this.resultsCount > this.visibleResultsCount
    },
    showLoader () {
      return this.loading || this.searching
    }
  },
  methods: {
    select (result) {
      this.query = null
      this.$emit('input', result)
    },
    focus () {
      this.$refs.input.focus()
    },
    blur () {
      this.$refs.input.blur()
    },
    clear (e) {
      if (!this.results) this.$emit('clear')
    },
    up () {
      this.navigate(-1, this.resultsCount - 1)
      this.scrollToActiveResult(true)
    },
    down () {
      this.navigate(1, 0)
      this.scrollToActiveResult(false)
    },
    navigate (offset, fallback) {
      const { activeResult, results } = this
      if (!results) return
      const i = results.indexOf(activeResult)
      this.activeResult = results[i + offset] || results[fallback]
    },
    getActiveResultElement () {
      const i = this.resultsCount ? this.results.indexOf(this.activeResult) : -1
      return this.$refs.results[i]
    },
    scrollToActiveResult (alignToTop) {
      if (!this.scrollNeeded) return
      const $el = this.getActiveResultElement()
      if ($el.scrollIntoViewIfNeeded) $el.scrollIntoViewIfNeeded(false)
      else $el.scrollIntoView(alignToTop)
    }
  },
  watch: {
    query: {
      immediate: true,
      handler: debounce(async function (query) {
        if (!query && !this.allowEmpty) {
          return this.$nextTick(() => {
            this.results = null
          })
        }

        this.searching = true
        try {
          const results = await this.search(query)
          if (query !== this.query) return
          this.results = results
        } catch (err) {
          console.warn(err)
        }

        this.searching = false
      }, 200)
    },
    results (results) {
      this.activeResult = results ? results[0] : null
    }
  },
  mounted () {
    this.$watch('autofocus', autofocus => {
      if (autofocus) this.$refs.input.focus()
    }, { immediate: true })
  }
}
</script>

<style scoped>
form {
  width: 100%;
  position: relative;
}

input {
  font-size: inherit;
  font-family: inherit;
  padding: 1em;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 6px -1px rgba(0, 0, 0, 0.25);
  border: none;
  position: relative;
  z-index: 1;
}

ol.results {
  --result-height: 72px;
  position: absolute;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  transition: all .15s ease .15s;
  box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.15);
  padding: 0;
  margin: 0;
  height: 0;
  opacity: 0;
  z-index: 1;
}

input:focus ~ ol.results,
input:valid ~ ol.results {
  transition-delay: unset;
  opacity: 1;
  height: calc(var(--result-height) * var(--results-count))
}

.count {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  padding-right: 40px;
  font-size: 12px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.25);
  font-weight: 600;
  user-select: none;
}

.loader {
  position: absolute;
  z-index: 1;
  height: 2px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transition: opacity .15s ease;
  opacity: 0;
}

.loader.visible {
  opacity: 1;
}

.loader:after {
  content: "";
  display: inline;
  position: absolute;
  width: 0;
  height: 100%;
  left: 0;
  text-align: center;
  background-color: var(--cc-blue);
  animation: loading 1s ease-in-out infinite;
}

@keyframes loading {
  from {
    width: 0;
  }

  to {
    left: 100%;
    width: 100%;
  }
}

h4 {
  margin: 0;
  padding-bottom: 20px;
}
</style>
