import { useDispatch, useSelector } from 'react-redux'
import { actions, onGetMoviesByGenre } from '../../redux/genresReducer'
import { AppStateType } from '../../redux/store'
import s from './Genres.module.scss'
import { Movie } from '../Common/Movie/Movie'
import { GenresSelect } from './GenresSelect'
import { GenresType, MovieType } from '../../types'
import { memo, useEffect } from 'react'
import { Paginator } from '../Common/Paginator/Paginator'
import { Preloader } from '../Common/Preloader/Preloader'
import { onGetAllGenres } from '../../redux/genresReducer'

export const Genres: React.FC = memo(() => {
    const movies = useSelector((state: AppStateType) => state.genres.movies)
    const allGenres = useSelector((state: AppStateType) => state.genres.allGenres)
    const genres = useSelector((state: AppStateType) => state.genres.genres)
    // Loaders
    const currentPage = useSelector((state: AppStateType) => state.genres.currentPage)
    const totalPages = useSelector((state: AppStateType) => state.genres.totalPages)
    // Loaders
    const isFetching = useSelector((state: AppStateType) => state.genres.isFetching)
    const isFetchingPage = useSelector((state: AppStateType) => state.genres.isFetchingPage)

    const dispatch = useDispatch()

    const setGenres = (genres: Array<GenresType>) => { dispatch(actions.setGenres(genres)) }
    const setCurrentPage = (page: number) => { dispatch(actions.setCurrentPage(page)) }
    
    // to get all genres
    useEffect(() => {
        const getAllGenres = () => { dispatch(onGetAllGenres()) }
        getAllGenres()
    }, [dispatch])

    // get movies
    useEffect(() => {
        const getMoviesByGenre = (page: number, genres: string) => { dispatch(onGetMoviesByGenre(page, genres)) }
        getMoviesByGenre(currentPage, genres.map(el => el.id).join(','))
    }, [dispatch, currentPage, genres])
    
    return <div className={s.search}>
        <GenresSelect genres={genres} allGenres={allGenres} setGenres={setGenres} />
        {isFetching ? <Preloader /> : movies.length < 1
            ? <span className={s.heading}>No movies found.</span>
            : <>
                <div className={s.head}>
                    <span className={s.heading}>{genres.length === 0 ? 'Select genres' : genres.map(el => el.name).join(', ')}</span>
                    <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
                {isFetchingPage ? <Preloader />
                    : <> <div className={s.movies}>
                            {movies.map((m: MovieType) =>
                                <Movie genresID={m.genre_ids} release={m.release_date} key={m.id} id={m.id} title={m.title} poster={m.poster_path} rating={m.vote_average} />
                            )}
                        </div>
                        <div className={s.head}>
                            <span className={s.heading}>{genres.length === 0 ? 'Select genres' : genres.map(el => el.name).join(', ')}</span>
                            <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </div>
                    </>
                }
            </>}
    </div>
})