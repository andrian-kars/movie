import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onGetRatedMovies } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Trends.module.scss'
import { Movie } from './../Common/Movie/Movie'
import { MovieType } from '../types'

export const Trends: React.FC = () => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.ratedMovies)
    const currentPage = useSelector((state: AppStateType) => state.search.currentPage)

    const dispatch = useDispatch()

    useEffect(() => {
        const getRatedMovies = (page: number) => { dispatch(onGetRatedMovies(page)) }
        getRatedMovies(currentPage)
    }, [dispatch, currentPage])
    
    return <div className={s.trends}>
        {ratedMovies.map((m: MovieType) =>
            <Movie key={m.id} id={m.id} title={m.title} poster={`https://image.tmdb.org/t/p/w500${m.poster_path}`} rating={m.vote_average} />
        )}
    </div>
}
