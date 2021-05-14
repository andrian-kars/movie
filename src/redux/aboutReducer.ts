import { api } from "../api"
import { MovieType, SavedMovieType } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    savedMovies: [] as Array<SavedMovieType>,
    aboutMovie: null as null | MovieType,
    isFetching: false,
}

export const aboutReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Loaders
        case 'M/ABOUT/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        // About
        case 'M/ABOUT/SET_ABOUT_MOVIE':
            return {
                ...state,
                aboutMovie: action.aboutMovie
            }
        case 'M/ABOUT/SET_SAVED_MOVIE':
            return {
                ...state,
                savedMovies: action.savedMovies
            }
        default: return state
    }
}

export const actions = {
    // Loaders
    setIsFetching: (isFetching: boolean) => ({ type: 'M/ABOUT/TOGGLE_IS_FETCHING', isFetching } as const),
    // About
    setAboutMovie: (movie: MovieType) => ({ type: 'M/ABOUT/SET_ABOUT_MOVIE', aboutMovie: movie } as const),
    setSavedMovies: (movies: Array<SavedMovieType>) => ({ type: 'M/ABOUT/SET_SAVED_MOVIE', savedMovies: movies } as const),
}

// About
export const onSetAboutMovie = (id: number): ThunkType => async dispatch => {
    dispatch(actions.setIsFetching(true))
    const moviesData = await api.getMovieCredits(id)
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setAboutMovie(moviesData))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>