<template>
  <table>
    <caption>
      <slot name="caption"></slot>
    </caption>
    <thead>
      <tr>
        <th role="button" v-for="column in columns" :key="column" :class="{ sorted: sortedBy === column, reverse }" @click="sortBy(column)">{{ column }}</th>
      </tr>
    </thead>
    <tbody v-for="result in sortedResults" :key="result.word">
      <tr role="button" @click="toggle(result.word)" :class="{ open: toggled[result.word] }">
        <td>{{ result.word }}</td>
        <td>{{ result.timestamps.length }}</td>
        <td>{{ result.average }} mins</td>
        <td>{{ result.score }}</td>
      </tr>
      <template v-if="toggled[result.word]">
        <tr v-for="(ts, i) in result.timestamps" :key="i" class="timestamp">
          <td colspan="4">
            <strong>{{ ts.start | toTimestamp }}</strong>
            <q>{{ ts.text }}</q>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import orderBy from 'lodash.orderby'

const pad = n => Array(2 - n.toString().length).fill(0).concat(n).join('')

export default {
  name: 'WordsTable',
  props: {
    results: null
  },
  data () {
    return {
      reverse: false,
      sortedBy: 'score',
      toggled: {}
    }
  },
  computed: {
    order () {
      return this.reverse ? 'asc' : 'desc'
    },
    columns () {
      return ['word', 'count', 'average', 'score']
    },
    sortedResults () {
      return orderBy(this.results, this.sortedBy, this.order)
    }
  },
  methods: {
    toggle (id) {
      this.$set(this.toggled, id, !this.toggled[id])
    },
    sortBy (column) {
      if (column === this.sortedBy) this.reverse = !this.reverse
      else this.sortedBy = column
    }
  },
  filters: {
    toTimestamp (ts) {
      const date = new Date(0, 0, 0, 0, 0, 0, ts)
      return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':')
    }
  }
}
</script>

<style scoped>
table {
  box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.15);
  border-collapse: collapse;
  border-spacing: .2em;
  margin-top: .4em;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
}

th {
  text-transform: uppercase;
  font-size: 60%;
  padding: 1em 0;
  min-width: 6em;
  position: relative;
}

tr[role="button"] {
  text-align: center;
}

th,
tr[role="button"] {
  transition: background-color .15s ease;
}

tr.open,
tr[role="button"]:hover,
th:hover {
  background-color: #fff;
}

td {
  padding: .5em;
}

th.sorted::after {
  content: '\00a0\25BC';
  position: absolute;
}

th.sorted.reverse::after {
  content: '\00a0\25B2';
}

tr.timestamp {
  background-color: #fff;
}

strong {
  font-family: monospace;
}

q {
  line-height: 1.5;
}

q::before {
    content: '\201C';
}

q::after {
    content: '\201D';
}
</style>