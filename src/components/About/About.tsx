import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSetAboutMovie } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './About.module.scss'
import { MovieType, SavedMovieType } from '../types'
import { NavLink, useParams } from 'react-router-dom'
import { Preloader } from '../Common/Preloader/Preloader'
import imgPlaceholder from './../../images/imagePlaceholder.jpg'

export const About: React.FC = memo(() => {    
    const aboutMovie: null | MovieType = useSelector((state: AppStateType) => state.search.aboutMovie)
    const savedMovies: Array<SavedMovieType> = useSelector((state: AppStateType) => state.search.savedMovies)
    const isFetching = useSelector((state: AppStateType) => state.search.isFetching)
    
    const dispatch = useDispatch()
    // Getting userID
    const params: { aboutID: string | undefined } = useParams()
    const userID = params.aboutID

    useEffect(() => {
        // Seting the movie
        const setAboutMovie = (id: number) => { dispatch(onSetAboutMovie(id)) }
        !!userID && setAboutMovie(+userID)
    }, [dispatch, userID])

    const saveMovie = (e: React.MouseEvent<HTMLInputElement>) => {
        const movieToSave = {
            id: aboutMovie?.id,
            title: aboutMovie?.title,
            poster: `https://image.tmdb.org/t/p/w500${aboutMovie?.poster_path}`,
            rate: aboutMovie?.vote_average,
        }
        if (savedMovies.length === 0) {
            localStorage.setItem('savedMovies', `[${JSON.stringify(movieToSave)}]`)
        } else {
            localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, movieToSave]))
        }
        e.currentTarget.disabled = true
    }

    // Img load slow internet
    const [loaded, setLoaded] = useState(false)

    return <div className={s.whrapper}>
        {isFetching ? <Preloader />
            : <>
                {!aboutMovie ? <p className={s.empty}>To see something select a <NavLink to="/search">movie</NavLink>.</p>
                    : <div className={s.about}>
                        <div>
                            {!loaded && <img className={s.img} src={imgPlaceholder} alt={aboutMovie.title} />}
                            <img onLoad={() => setLoaded(true)} className={s.img} src={`https://image.tmdb.org/t/p/w500${aboutMovie.poster_path}`} alt={aboutMovie.title} />
                        </div>
                        <div className={s.content}>
                            <h2 className={s.heading}>{aboutMovie.title}</h2>
                            <p className={s.tagline}>{aboutMovie.tagline}</p>
                            <div className={s.rates}>
                                <span className={s.rate}>{aboutMovie.vote_average} / 10 <span>({aboutMovie.vote_count})</span></span>
                                {/* <span className={s.rate}>{aboutMovie.production_countries[0].name} / {aboutMovie.runtime} min. / {aboutMovie.release_date.slice(0, 4)} year</span> */}
                                <span className={s.rate}>{aboutMovie.runtime} min. / {aboutMovie.release_date.slice(0, 4)} year</span>
                            </div>
                            <p className={s.sub}>Genres</p>
                            <div className={s.genres}>
                                {aboutMovie.genres.map(g => <span key={g.id}>{g.name}</span>)}
                            </div>
                            <p className={s.sub}>Languages</p>
                            <div className={s.languages}>
                                {aboutMovie.spoken_languages.map(g => <span key={g.name}>{g.name}</span>)}
                            </div>
                            <p className={s.sub}>Overview</p>
                            <p className={s.overview}>{aboutMovie.overview}</p>
                            {savedMovies.some(el => el.id === aboutMovie.id) ? <button title="You have already saved this movie" disabled className={s.button}>save</button>
                                : <button onClick={saveMovie as () => void} className={s.button}>save</button>}
                        </div>
                    </div>}
            </>
        }
    </div>
})