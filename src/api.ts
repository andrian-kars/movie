import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const searchEnglishAPI = {
    getMoviesByName(page: number, movie: string) {
        return instance.get(`search/movie?api_key=db9335d85fa75ffde96f893df33598bb&query=${movie}&page=${page}`).then(res => res.data)
    },
    getMovieCredits(movieID: number | null) {
        return instance.get(`movie/${movieID}?api_key=db9335d85fa75ffde96f893df33598bb`).then(res => res.data)
    },
    getRatedMovies(page: number) {
        return instance.get(`movie/top_rated?api_key=db9335d85fa75ffde96f893df33598bb&page=${page}`).then(res => res.data)
    },
    getUpcomingMovies(page: number) {
        return instance.get(`movie/upcoming?api_key=db9335d85fa75ffde96f893df33598bb&page=${page}`).then(res => res.data)
    },
    getMoviesByGenre(page: number, genres: string) {
        return instance.get(`movie/movie?api_key=db9335d85fa75ffde96f893df33598bb&page=${page}&with_genres=${genres}`).then(res => res.data)
    }
}