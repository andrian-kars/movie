import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onGetRatedMovies } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Search.module.scss'
import { Movie } from '../Common/Movie/Movie'
import { MovieType } from '../types'

export const Search: React.FC = () => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.ratedMovies)

    const dispatch = useDispatch()

    useEffect(() => {
        const getRatedMovies = (page: number) => { dispatch(onGetRatedMovies(page)) }
        getRatedMovies(1)
    }, [dispatch])
    
    return <div className={s.trends}>
        {ratedMovies.map((m: MovieType) =>
            <Movie key={m.id} id={m.id} title={m.title} poster={`https://image.tmdb.org/t/p/w500${m.poster_path}`} rating={m.vote_average} />
        )}
    </div>
}
