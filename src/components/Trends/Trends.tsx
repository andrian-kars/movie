import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, onGetRatedMovies } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Trends.module.scss'
import { Movie } from './../Common/Movie/Movie'
import { MovieType } from '../types'
import { Paginator } from './../Common/Paginator/Paginator'

export const Trends: React.FC = memo(() => {
    const ratedMovies = useSelector((state: AppStateType) => state.search.ratedMovies)
    const currentPage = useSelector((state: AppStateType) => state.search.currentPageTrends)
    const totalPages = useSelector((state: AppStateType) => state.search.totalPagesTrends)

    const dispatch = useDispatch()

    useEffect(() => {
        const getRatedMovies = (page: number) => { dispatch(onGetRatedMovies(page)) }
        getRatedMovies(currentPage)
    }, [dispatch, currentPage])

    const onPageChange = (page: number) => dispatch(actions.setCurrentPageTrends(page))

    return <div className={s.trends}>
        <div className={s.head}>
            <span className={s.heading}>Trends</span>
            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
        <div className={s.movies}>
            {ratedMovies.map((m: MovieType) =>
                <Movie key={m.id} id={m.id} title={m.title} poster={`https://image.tmdb.org/t/p/w500${m.poster_path}`} rating={m.vote_average} />
            )}
        </div>
        <div className={s.head}>
            <span className={s.heading}>Trends</span>
            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    </div>
})
