require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,

  // How many API calls the client caches in the LRU cache
  apiCacheLimit: 25,

  app: {
    title: 'NP Legends',
    description: 'Exploring the symbols of National Park Service maps.',
    head: {
      titleTemplate: '%s - NP Legends',
      meta: [
        {
          name: 'description',
          content: 'NP Legends - Exploring the symbols of National Park Service maps.',
        },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'NP Legends' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'NP Legends' },
        {
          property: 'og:description',
          content: 'NP Legends - Exploring the symbols of National Park Service maps.',
        },
      ],
    },
  },

}, environment);
