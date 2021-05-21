import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/aboutReducer'
import { AppStateType } from '../../redux/store'
import s from './Saved.module.scss'
import { Movie } from './../Common/Movie/Movie'
import { SavedMovieType } from '../../types'
import { NavLink } from 'react-router-dom'
import { Preloader } from '../Common/Preloader/Preloader'

export const Saved: React.FC = memo(() => {
    const savedMovies = useSelector((state: AppStateType) => state.about.savedMovies)
    const isFetching = useSelector((state: AppStateType) => state.about.isFetching)

    const dispatch = useDispatch()
    const localSavedItems = localStorage.getItem('savedMovies')

    useEffect(() => {
        dispatch(actions.setSavedMovies(JSON.parse('' + localSavedItems)))
    }, [dispatch, localSavedItems])
    
    return <div className={s.whrapper}>
        {isFetching ? <Preloader />
            : <>
                {savedMovies === null || savedMovies.length === 0 ? <p className={s.empty}>To see something save a <NavLink to="/search">movie</NavLink>.</p>
                    : <div className={s.saved}>
                        <div className={s.movies}>
                            {savedMovies.map((m: SavedMovieType) =>
                                <Movie genresID={m.genre_ids} release={m.release_date} key={m.id} id={m.id} title={m.title} poster={m.poster} rating={m.rate} />
                            )}
                        </div>
                    </div>}
            </>}
    </div>
})