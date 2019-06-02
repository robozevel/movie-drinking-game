<template>
  <table>
    <caption>
      <slot name="caption" />
    </caption>
    <thead>
      <tr>
        <th />
        <th v-for="column in columns" :key="column" role="button" :class="{ sorted: sortedBy === column, reverse }" @click="sortBy(column)">
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody v-for="result in sortedResults" :key="result.word">
      <tr role="button" :class="{ open: toggled[result.word], selected: selected[result.word] }" @click="toggle(result.word)">
        <td @click.stop>
          <label>
            <input v-model="selected[result.word]" type="checkbox" hidden>
            <div class="checkbox" role="button" />
          </label>
        </td>
        <td class="word">
          {{ result.word }}
        </td>
        <td>{{ result.timestamps.length }}</td>
        <td>{{ result.average }} mins</td>
        <td>{{ result.score }}</td>
      </tr>
      <template v-if="toggled[result.word]">
        <tr v-for="(ts, i) in result.timestamps" :key="i" class="timestamp">
          <td colspan="5">
            <strong>{{ ts.start | toTimestamp }}</strong>
            <q>{{ ts.text }}</q>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot v-if="summary">
      <tr>
        <td />
        <td>{{ summary.word }}</td>
        <td>{{ summary.timestamps.length }}</td>
        <td>{{ summary.average }} mins</td>
        <td />
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import orderBy from 'lodash.orderby'
import { parseOccurrences } from '@/utils/subtitles/parse'
import pad from '@/utils/pad'
import { Results } from '@/models'

@Component({
  filters: {
    toTimestamp(ts) {
      const date = new Date(0, 0, 0, 0, 0, 0, ts)
      return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':')
    }
  }
})
export default class WordsTable extends Vue {
  @Prop() results? : Results
  reverse = false
  sortedBy = 'score'
  toggled = {}
  selected = {}

  get order() {
    return this.reverse ? 'asc' : 'desc'
  }

  get columns() {
    return ['word', 'count', 'average', 'score']
  }

  get sortedResults() {
    return orderBy(this.results, this.sortedBy, this.order)
  }

  get summary() {
    const timestamps : number[] = []
    const words: string[] = []
    const results : Results = this.results || []

    for (const [word, selected] of Object.entries(this.selected)) {
      if (!selected) continue
      const result = results.find(result => result.word === word)
      if (!result) continue
      words.push(result.word)
      timestamps.push(...result.timestamps)
    }

    if (!words.length) return null

    const [summary] = parseOccurrences([
      [
        words.join(', '),
        timestamps
      ]
    ])

    return summary
  }

  toggle(id) {
    this.$set(this.toggled, id, !this.toggled[id])
  }

  sortBy(column) {
    if (column === this.sortedBy) this.reverse = !this.reverse
    else this.sortedBy = column
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
  position: relative;
}

th[role="button"] {
  min-width: 6em;
}

tr[role="button"],
tfoot tr {
  text-align: center;
}

th,
tr[role="button"] {
  transition: background-color .15s ease;
}

tr.open,
tr[role="button"]:hover,
th[role="button"]:hover {
  background-color: #fff;
}

tr.selected,
tr.selected[role="button"]:hover {
  background-color: #ffcc4d;
}

td {
  padding: .5em;
}

tr[role="button"] td {
  white-space: nowrap;
}

td.word {
  width: 100%
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

.checkbox {
  margin: 0 auto;
  transition: all .15s ease;
  border: .1em solid #666;
  border-radius: 6px;
  height: 1em;
  width: 1em;
}

[type="checkbox"]:checked + .checkbox {
  border-color: #f4900c;
  background-color: #f4900c;
}

tfoot td {
  background-color: #000;
  color: #fff;
  position: sticky;
  bottom: 0;
}
</style>
