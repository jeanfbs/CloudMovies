import axios from 'axios'
import movies from './movies.json'

const { REACT_APP_NET_MOVIES: NET_MOVIES } = process.env

export default class MovieService {
  constructor(apiResponseResolver) {
    this.apiResponseResolver = apiResponseResolver
  }

  getMovies = (category) => {
    if (!category) {
      return Promise.reject('Category is null')
    }
    return movies.categories.find((cat) => cat.url == category)
  }

  getMoviesSortBy = (category, sortBy) => {
    if (!category) {
      return Promise.reject('Category is null')
    }
    const result = movies.categories.find((cat) => cat.url == category)

    return result.movies.sort((a, b) => this.compare(a, b, sortBy))
  }

  compare(a, b, property) {
    if (a[property] < b[property]) {
      return -1
    }
    if (a[property] > b[property]) {
      return 1
    }
    return 0
  }
}
