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

      // description
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', property: 'og:description', content: description }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' }
    ]
  },
  loading: false,
  manifest: {
    name: title,
    ogType: null,
    ogTitle: null,
    ogDescription: null,
    ogSiteName: null,
    description: null,
    display: 'standalone',
    theme_color: '#000',
    twitterSite: '@robozevel',
    twitterCreator: '@robozevel'
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