import { searchEnglishAPI } from "../api"
import { MovieType } from "../components/types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    movies: [] as Array<MovieType>,
    ratedMovies: [] as Array<MovieType>,
    currentPage: 1,
    currentSearchName: ''
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
        default: return state
    }
}

export const actions = {
    setRatedMovies: (ratedMovies: Array<MovieType>) => ({ type: 'M/SEARCH/SET_RATED_MOVIES', ratedMovies: ratedMovies } as const),
    setMovies: (movies: Array<MovieType>) => ({ type: 'M/SEARCH/SET_MOVIES', movies: movies } as const),
    setCurrentSearchName: (name: string) => ({ type: 'M/SEARCH/SET_CURRENT_SEARCH_NAME', currentSearchName: name } as const),
}

export const onGetRatedMovies = (page: number): ThunkType => async dispatch => {
    const ratedMoviesData = await searchEnglishAPI.getRatedMovies(page)
    dispatch(actions.setRatedMovies(ratedMoviesData.results))
}

export const onGetMoviesByName = (page: number, movie: string): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getMoviesByName(page, movie)
    dispatch(actions.setMovies(moviesData.results))
}

export const onGetUpcomingMovies = (page: number): ThunkType => async dispatch => {
    const moviesData = await searchEnglishAPI.getUpcomingMovies(page)
    dispatch(actions.setMovies(moviesData.results))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>