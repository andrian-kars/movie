import { api } from "../api"
import { GenresType, MovieType } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    movies: [] as Array<MovieType>,
    allGenres: [] as Array<GenresType>,
    genres: '',
    currentPage: 1,
    totalPages: 0,
    isFetching: false,
    isFetchingPage: false,
}

export const genresReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Loaders
        case 'M/GENRES/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'M/GENRES/TOGGLE_IS_FETCHING_PAGE':
            return {
                ...state,
                isFetchingPage: action.isFetchingPage
            }
        // Pages
        case 'M/GENRES/SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.totalPages
            }
        case 'M/GENRES/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        // Genres
        case 'M/GENRES/SET_MOVIES':
            return {
                ...state,
                movies: action.movies
            }
        case 'M/GENRES/SET_ALL_GENRES':
            return {
                ...state,
                allGenres: action.allGenres
            }
        case 'M/GENRES/SET_GENRES':
            return {
                ...state,
                genres: action.genres
            }
        default: return state
    }
}

export const actions = {
    // Loaders
    setIsFetching: (isFetching: boolean) => ({ type: 'M/GENRES/TOGGLE_IS_FETCHING', isFetching } as const),
    setIsFetchingPage: (isFetchingPage: boolean) => ({ type: 'M/GENRES/TOGGLE_IS_FETCHING_PAGE', isFetchingPage } as const),
    // Pages
    setCurrentPage: (currentPage: number) => ({ type: 'M/GENRES/SET_CURRENT_PAGE', currentPage: currentPage } as const),
    setTotalPages: (totalPages: number) => ({ type: 'M/GENRES/SET_TOTAL_PAGES', totalPages: totalPages } as const),
    // Genres
    setMovies: (movies: Array<MovieType>) => ({ type: 'M/GENRES/SET_MOVIES', movies: movies } as const),
    // Geting all Genres and then use them as options
    setAllGenres: (allGenres: Array<GenresType>) => ({ type: 'M/GENRES/SET_ALL_GENRES', allGenres: allGenres } as const),
    setGenres: (genres: string) => ({ type: 'M/GENRES/SET_GENRES', genres: genres } as const),
}

// Search
export const onGetMoviesByGenre = (page: number, movie: string): ThunkType => async (dispatch, getState) => {
    const currentPage = getState().search.currentPageSearch
    // To keep pagination and search it needs two fetches
    if (currentPage === 1) {
        dispatch(actions.setIsFetching(true))
    } else {
        dispatch(actions.setIsFetchingPage(true))
    }
    const moviesData = await api.getMoviesByGenre(page, movie)
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