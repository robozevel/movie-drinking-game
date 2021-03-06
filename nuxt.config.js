const title = 'LET\'S GET SHITFACED 🍻'
const description = 'Movie Drinking Game'

export default {
  mode: 'universal',
  modern: 'client',
  render: {
    fallback: false
  },
  head: {
    title,
    htmlAttrs: {
      lang: 'en-US'
    },
    meta: [
      { hid: 'viewport', name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:site_name', property: 'og:site_name', content: 'guy.is' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', property: 'og:description', content: description }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato&display=swap' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' }
    ]
  },
  loading: {
    color: '#ffac33',
    throttle: 100
  },
  modules: [
    '@nuxtjs/robots',
    ['@nuxtjs/google-analytics', {
      id: 'UA-139919699-2'
    }]
  ],
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient && config.module) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
