const title = 'LET\'S GET SHITFACED 🍻'
const description = 'Movie Drinking Game'

module.exports = () => ({
  mode: 'universal',
  render: {
    fallback: false
  },
  head: {
    title,
    meta: [
      { hid: 'viewport', name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:site_name', property: 'og:site_name', content: 'guy.is' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', property: 'og:description', content: description }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' }
    ]
  },
  loading: {
    color: '#ffac33',
    throttle: 100
  },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
})