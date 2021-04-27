// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onGetMoviesByName } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Search.module.scss'
import { Movie } from '../Common/Movie/Movie'
import { SearchForm } from './SearchForm'
import { MovieType } from '../types'

export const Search: React.FC = () => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.movies)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     getMoviesByName(1, 'your')
    // }, [dispatch])

    const getMoviesByName = (page: number, movie: string) => { dispatch(onGetMoviesByName(page, movie)) }
    
    return <div className={s.search}>
        <SearchForm getMoviesByName={getMoviesByName} />
        <div className={s.movies}>
            {ratedMovies.map((m: MovieType) =>
                <Movie key={m.id} id={m.id} title={m.title} poster={`https://image.tmdb.org/t/p/w500${m.poster_path}`} rating={m.vote_average} />
            )}
        </div>
    </div>
}
