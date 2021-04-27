import { searchEnglishAPI } from "../api"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState = {
    ratedMovies: [] as Array<any>
}

export const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'M/SEARCH/SET_RATED_MOVIES':
            return {
                ...state,
                ratedMovies: action.ratedMovies
            }
        default: return state
    }
}

export const actions = {
    setRatedMovies: (ratedMovies: Array<any>) => ({ type: 'M/SEARCH/SET_RATED_MOVIES', ratedMovies: ratedMovies } as const),
}

export const onGetRatedMovies = (page: number): ThunkType => async dispatch => {
    const ratedMoviesData = await searchEnglishAPI.getRatedMovies(page)
    dispatch(actions.setRatedMovies(ratedMoviesData.results))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>