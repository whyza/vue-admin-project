'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  MOVIE_API: '"https://api.douban.com/v2/movie/top250"',
  USER_API: '"http://localhost:3000/"'
})
