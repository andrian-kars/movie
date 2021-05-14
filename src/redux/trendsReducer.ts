import { searchEnglishAPI } from "../api"
import { MovieType } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    ratedMovies: [] as Array<MovieType>,
    currentPage: 1,
    totalPages: 0,
    isFetching: false,
    isFetchingPage: false,
}

export const trendsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Loaders
        case 'M/TRENDS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'M/TRENDS/TOGGLE_IS_FETCHING_PAGE':
            return {
                ...state,
                isFetchingPage: action.isFetchingPage
            }
        // Pages
        case 'M/TRENDS/SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.totalPages
            }
        case 'M/TRENDS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        // Trends
        case 'M/TRENDS/SET_RATED_MOVIES':
            return {
                ...state,
                ratedMovies: action.ratedMovies
            }
        default: return state
    }
}

export const actions = {
    // Loaders
    setIsFetching: (isFetching: boolean) => ({ type: 'M/TRENDS/TOGGLE_IS_FETCHING', isFetching } as const),
    setIsFetchingPage: (isFetchingPage: boolean) => ({ type: 'M/TRENDS/TOGGLE_IS_FETCHING_PAGE', isFetchingPage } as const),
    // Pages
    setCurrentPage: (currentPage: number) => ({ type: 'M/TRENDS/SET_CURRENT_PAGE', currentPage: currentPage } as const),
    setTotalPages: (totalPages: number) => ({ type: 'M/TRENDS/SET_TOTAL_PAGES', totalPages: totalPages } as const),
    // Trends
    setRatedMovies: (ratedMovies: Array<MovieType>) => ({ type: 'M/TRENDS/SET_RATED_MOVIES', ratedMovies: ratedMovies } as const),
}


// Trends
export const onGetRatedMovies = (page: number): ThunkType => async(dispatch, getState) => {
    const currentPage = getState().trends.currentPage
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(true))
    } else {
        dispatch(actions.setIsFetchingPage(true))
    }
    const ratedMoviesData = await searchEnglishAPI.getRatedMovies(page)
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(false))
    } else {
        dispatch(actions.setIsFetchingPage(false))
    }
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setTotalPages(ratedMoviesData.total_pages))
    dispatch(actions.setRatedMovies(ratedMoviesData.results))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>