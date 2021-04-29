import { searchEnglishAPI } from "../api"
import { MovieType, SavedMovieType } from "../components/types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    movies: [] as Array<MovieType>,
    ratedMovies: [] as Array<MovieType>,
    savedMovies: [] as Array<SavedMovieType>,
    currentSearchName: '',
    currentPageSearch: 1,
    totalPagesSearch: 1,
    currentPageTrends: 1,
    totalPagesTrends: 1,
    aboutMovie: null as null | MovieType
}

export const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'M/SEARCH/SET_RATED_MOVIES':
            return {
                ...state,
                ratedMovies: action.ratedMovies
            }
        case 'M/SEARCH/SET_MOVIES':
            return {
                ...state,
                movies: action.movies
            }
        case 'M/SEARCH/SET_CURRENT_SEARCH_NAME':
            return {
                ...state,
                currentSearchName: action.currentSearchName
            }
        case 'M/SEARCH/SET_CURRENT_PAGE_SEARCH':
            return {
                ...state,
                currentPageSearch: action.currentPageSearch
            }
        case 'M/SEARCH/SET_TOTAL_PAGES_SEARCH':
            return {
                ...state,
                totalPagesSearch: action.totalPagesSearch
            }
        case 'M/SEARCH/SET_CURRENT_PAGE_TRENDS':
            return {
                ...state,
                currentPageTrends: action.currentPageTrends
            }
        case 'M/SEARCH/SET_TOTAL_PAGES_TRENDS':
            return {
                ...state,
                totalPagesTrends: action.totalPagesTrends
            }
        case 'M/SEARCH/SET_ABOUT_MOVIE':
            return {
                ...state,
                aboutMovie: action.aboutMovie
            }
        case 'M/SEARCH/SET_SAVED_MOVIE':
            return {
                ...state,
                savedMovies: action.savedMovies
            }
        default: return state
    }
}

export const actions = {
    // Search
    setMovies: (movies: Array<MovieType>) => ({ type: 'M/SEARCH/SET_MOVIES', movies: movies } as const),
    setCurrentSearchName: (name: string) => ({ type: 'M/SEARCH/SET_CURRENT_SEARCH_NAME', currentSearchName: name } as const),
    setCurrentPageSearch: (page: number) => ({ type: 'M/SEARCH/SET_CURRENT_PAGE_SEARCH', currentPageSearch: page } as const),
    setTotalPagesSearch: (pages: number) => ({ type: 'M/SEARCH/SET_TOTAL_PAGES_SEARCH', totalPagesSearch: pages } as const),
    // Trends
    setRatedMovies: (ratedMovies: Array<MovieType>) => ({ type: 'M/SEARCH/SET_RATED_MOVIES', ratedMovies: ratedMovies } as const),
    setCurrentPageTrends: (page: number) => ({ type: 'M/SEARCH/SET_CURRENT_PAGE_TRENDS', currentPageTrends: page } as const),
    setTotalPagesTrends: (pages: number) => ({ type: 'M/SEARCH/SET_TOTAL_PAGES_TRENDS', totalPagesTrends: pages } as const),
    // About
    setAboutMovie: (movie: MovieType) => ({ type: 'M/SEARCH/SET_ABOUT_MOVIE', aboutMovie: movie } as const),
    setSavedMovies: (movies: Array<SavedMovieType>) => ({ type: 'M/SEARCH/SET_SAVED_MOVIE', savedMovies: movies } as const),
}

// Search
export const onGetMoviesByName = (page: number, movie: string): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getMoviesByName(page, movie)
    dispatch(actions.setTotalPagesSearch(moviesData.total_pages))
    dispatch(actions.setMovies(moviesData.results))
}

export const onGetUpcomingMovies = (page: number): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getUpcomingMovies(page)
    dispatch(actions.setTotalPagesSearch(moviesData.total_pages))
    dispatch(actions.setMovies(moviesData.results))
}

export const onPageChangeSearch = (page: number): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getUpcomingMovies(page)
    dispatch(actions.setTotalPagesSearch(moviesData.total_pages))
    dispatch(actions.setMovies(moviesData.results))
}

// Trends
export const onGetRatedMovies = (page: number): ThunkType => async dispatch => {
    const ratedMoviesData = await searchEnglishAPI.getRatedMovies(page)
    dispatch(actions.setTotalPagesTrends(ratedMoviesData.total_pages))
    dispatch(actions.setRatedMovies(ratedMoviesData.results))
}

export const onPageChangeTrends = (page: number): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getUpcomingMovies(page)
    dispatch(actions.setTotalPagesTrends(moviesData.total_pages))
    dispatch(actions.setMovies(moviesData.results))
}

// About
export const onSetAboutMovie = (id: number): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getMovieCredits(id)
    dispatch(actions.setAboutMovie(moviesData))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>