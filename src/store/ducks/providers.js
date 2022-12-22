import { ApiResponseResolver, MovieService } from '../../services'

const apiResponseResolver = new ApiResponseResolver()
const initialState = {
  movieService: new MovieService(apiResponseResolver),
}

export default function reducer() {
  return initialState
}
