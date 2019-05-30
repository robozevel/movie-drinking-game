import axios from 'axios'

const baseURL = 'https://imdb-suggest.now.sh'

export default query => axios(query, { baseURL }).then((res) => {
  return res.data.d.filter(result => result.q === 'feature').map((result) => {
    const { s: subtitle, l: name, y: year, id, i: image } = result
    const title = year ? `${name} (${year})` : name
    return { id, title, subtitle, image }
  })
})
