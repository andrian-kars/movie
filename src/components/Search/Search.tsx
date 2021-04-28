import { useDispatch, useSelector } from 'react-redux'
import { onGetUpcomingMovies, onGetMoviesByName } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Search.module.scss'
import { Movie } from '../Common/Movie/Movie'
import { SearchForm } from './SearchForm'
import { MovieType } from '../types'
import { useEffect } from 'react'

export const Search: React.FC = () => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.movies)

    const dispatch = useDispatch()

    const getMoviesByName = (page: number, movie: string) => { dispatch(onGetMoviesByName(page, movie)) }

    useEffect(() => {
        const getUpcomingMovies = (page: number) => { dispatch(onGetUpcomingMovies(page)) }
        getUpcomingMovies(1)
    }, [dispatch])

    console.log(ratedMovies);
    
    
    return <div className={s.search}>
        <SearchForm getMoviesByName={getMoviesByName} />
        <div className={s.movies}>
            {ratedMovies.map((m: MovieType) =>
                <Movie key={m.id} id={m.id} title={m.title} poster={m.poster_path} rating={m.vote_average} />
            )}
        </div>
    </div>
}
