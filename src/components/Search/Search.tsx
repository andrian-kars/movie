import { useDispatch, useSelector } from 'react-redux'
import { onGetUpcomingMovies, onGetMoviesByName, actions } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './Search.module.scss'
import { Movie } from '../Common/Movie/Movie'
import { SearchForm } from './SearchForm'
import { MovieType } from './../../types'
import { memo, useEffect } from 'react'
import { Paginator } from './../Common/Paginator/Paginator'
import { Preloader } from './../Common/Preloader/Preloader'

export const Search: React.FC = memo(() => {
    const movies = useSelector((state: AppStateType) => state.search.movies)
    const currentSearchName = useSelector((state: AppStateType) => state.search.currentSearchName)
    const currentPage = useSelector((state: AppStateType) => state.search.currentPage)
    const totalPages = useSelector((state: AppStateType) => state.search.totalPages)
    // Loaders
    const isFetching = useSelector((state: AppStateType) => state.search.isFetching)
    const isFetchingPage = useSelector((state: AppStateType) => state.search.isFetchingPage)

    const dispatch = useDispatch()

    const getMoviesByName = (page: number, movie: string) => {
        dispatch(actions.setCurrentSearchName(movie))
        dispatch(onGetMoviesByName(page, movie))
    }
    const getUpcomingMovies = (page: number) => { dispatch(onGetUpcomingMovies(page)) }
    // To reset to 1 when sth is searched
    const setCurrentPage = (page: number) => { dispatch(actions.setCurrentPage(page)) }

    useEffect(() => {
        if (currentSearchName) {
            getMoviesByName(currentPage, currentSearchName)
        } else {
            getUpcomingMovies(currentPage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])
    
    return <div className={s.search}>
        <SearchForm getMoviesByName={getMoviesByName} setCurrentPage={setCurrentPage} />
        {isFetching ? <Preloader /> : movies.length < 1
            ? <span className={s.heading}>No movies found.</span>
            : <>
                <div className={s.head}>
                    <span className={s.heading}>{!currentSearchName ? 'Upcoming' : currentSearchName}</span>
                    <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
                {isFetchingPage ? <Preloader />
                    : <> <div className={s.movies}>
                            {movies.map((m: MovieType) =>
                                <Movie genresID={m.genre_ids} release={m.release_date} key={m.id} id={m.id} title={m.title} poster={m.poster_path} rating={m.vote_average} />
                            )}
                        </div>
                        <div className={s.head}>
                            <span className={s.heading}>{!currentSearchName ? 'Upcoming' : currentSearchName}</span>
                            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>
                    </>
                }
            </>}
    </div>
})