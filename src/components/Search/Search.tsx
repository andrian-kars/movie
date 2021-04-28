import { useDispatch, useSelector } from 'react-redux'
import { onGetUpcomingMovies, onGetMoviesByName, actions } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Search.module.scss'
import { Movie } from '../Common/Movie/Movie'
import { SearchForm } from './SearchForm'
import { MovieType } from '../types'
import { useEffect } from 'react'

export const Search: React.FC = () => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.movies)
    const currentPage = useSelector((state: AppStateType) => state.search.currentPage)
    const currentSearchName = useSelector((state: AppStateType) => state.search.currentSearchName)

    const dispatch = useDispatch()

    const getMoviesByName = (page: number, movie: string) => {
        dispatch(actions.setCurrentSearchName(movie))
        dispatch(onGetMoviesByName(page, movie)) 
    }
    const getUpcomingMovies = (page: number) => { dispatch(onGetUpcomingMovies(page)) }

    useEffect(() => {
        if (currentSearchName) {
            getMoviesByName(currentPage, currentSearchName)
        } else {
            getUpcomingMovies(currentPage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return <div className={s.search}>
        <span>{!currentSearchName ? 'Upcoming' : currentSearchName}</span>
        <SearchForm getMoviesByName={getMoviesByName} />
        <div className={s.movies}>
            {ratedMovies.map((m: MovieType) =>
                <Movie key={m.id} id={m.id} title={m.title} poster={m.poster_path} rating={m.vote_average} />
            )}
        </div>
    </div>
}
