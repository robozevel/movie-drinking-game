import axios from 'axios'

const baseURL = 'https://subtitles.now.sh/'

export default id => axios(id, { baseURL }).then(res => res.data)
