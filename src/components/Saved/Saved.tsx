import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Saved.module.scss'
import { Movie } from './../Common/Movie/Movie'
import { SavedMovieType } from '../types'
import { NavLink } from 'react-router-dom'

export const Saved: React.FC = memo(() => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.savedMovies)

    const dispatch = useDispatch()
    const localSavedItems = localStorage.getItem('savedMovies')

    useEffect(() => {
        const setSavedMovies = (movies: Array<SavedMovieType>) => { dispatch(actions.setSavedMovies(movies)) }
        setSavedMovies(JSON.parse('' + localSavedItems))
    }, [dispatch, localSavedItems])

    if (ratedMovies.length === 0) {
        return <div className={s.empty}>
            <p>To see something save a <NavLink to="/search">movie</NavLink>.</p>
        </div>
    } else return <div className={s.saved}>
        <div className={s.movies}>
            {ratedMovies.map((m: SavedMovieType) =>
                <Movie key={m.id} id={m.id} title={m.title} poster={m.poster} rating={m.rate} />
            )}
        </div>
    </div>
})
