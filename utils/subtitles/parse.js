import { mean, stdev } from 'stats-lite'
import { uniqueWords } from 'truly-unique'

export function parseOccurrences(occurrences, options = {}) {
  const results = []

  for (const [word, timestamps] of occurrences) {
    const count = timestamps.length
    if (count < options.minCount || count > options.maxCount) continue

    const diffs = timestamps.map(({ start }) => start / 1000 / 60).map((start, i, arr) => start - (arr[i - 1] || 0))
    if (diffs.some(diff => diff <= options.minDiff)) continue

    const average = Math.round(mean(diffs))
    const score = Math.round(average * Math.pow(count, 3) / stdev(diffs))
    results.push({ word, timestamps, count, average, diffs, score })
  }

  return results
}

export default (subtitles, options) => {
  const occurrences = new Map()
  for (const cue of subtitles) {
    const { text, start } = cue
    if (text.includes('OpenSubtitles')) continue
    const words = uniqueWords(text, { stopwords: true })
    for (const word of words) {
      const timestamps = occurrences.get(word) || []
      timestamps.push({ start, text })
      occurrences.set(word, timestamps)
    }
  }

  return parseOccurrences(occurrences, options)
}
