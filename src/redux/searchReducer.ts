import { api } from "./../api"
import { MovieType } from "./../types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    movies: [] as Array<MovieType>,
    currentSearchName: '',
    currentPage: 1,
    totalPages: 1,
    isFetching: false,
    isFetchingPage: false,
}

export const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
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
        case 'M/SEARCH/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'M/SEARCH/SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.totalPages
            }
        case 'M/SEARCH/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'M/SEARCH/TOGGLE_IS_FETCHING_PAGE':
            return {
                ...state,
                isFetchingPage: action.isFetchingPage
            }
        default: return state
    }
}

export const actions = {
    // Common
    setIsFetching: (isFetching: boolean) => ({ type: 'M/SEARCH/TOGGLE_IS_FETCHING', isFetching } as const),
    setIsFetchingPage: (isFetchingPage: boolean) => ({ type: 'M/SEARCH/TOGGLE_IS_FETCHING_PAGE', isFetchingPage } as const),
    // Search
    setMovies: (movies: Array<MovieType>) => ({ type: 'M/SEARCH/SET_MOVIES', movies: movies } as const),
    setCurrentSearchName: (name: string) => ({ type: 'M/SEARCH/SET_CURRENT_SEARCH_NAME', currentSearchName: name } as const),
    setCurrentPage: (page: number) => ({ type: 'M/SEARCH/SET_CURRENT_PAGE', currentPage: page } as const),
    setTotalPages: (pages: number) => ({ type: 'M/SEARCH/SET_TOTAL_PAGES', totalPages: pages } as const),
}

// Search
export const onGetMoviesByName = (page: number, movie: string): ThunkType => async (dispatch, getState) => {
    const currentPage = getState().search.currentPage
    // To keep pagination and search it needs two fetches
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(true))
    } else {
        dispatch(actions.setIsFetchingPage(true))
    }
    const moviesData = await api.getMoviesByName(page, movie)
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(false))
    } else {
        dispatch(actions.setIsFetchingPage(false))
    }
    dispatch(actions.setTotalPages(moviesData.total_pages))
    dispatch(actions.setMovies(moviesData.results))
}

export const onGetUpcomingMovies = (page: number): ThunkType => async (dispatch, getState) => {
    const currentPage = getState().search.currentPage
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(true))
    } else {
        dispatch(actions.setIsFetchingPage(true))
    }
    const moviesData = await api.getUpcomingMovies(page)
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(false))
    } else {
        dispatch(actions.setIsFetchingPage(false))
    }
    dispatch(actions.setTotalPages(moviesData.total_pages))
    dispatch(actions.setMovies(moviesData.results))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>