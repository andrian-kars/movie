import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSetAboutMovie } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './About.module.scss'
import { MovieType } from '../types'
import { useParams } from 'react-router-dom'

export const About: React.FC = memo(() => {
    const aboutMovie: null | MovieType = useSelector((state: AppStateType) => state.search.aboutMovie)
    const dispatch = useDispatch()
    const params: { aboutID: string | undefined } = useParams()
    const userID = params.aboutID

    useEffect(() => {
        const setAboutMovie = (id: number) => { dispatch(onSetAboutMovie(id)) }
        !userID ? setAboutMovie(69) : setAboutMovie(+userID)
    }, [dispatch, userID])


    console.log(aboutMovie);
    
    
    if (!aboutMovie) {
        return <div></div>
    } else return <div className={s.about}>
        <img className={s.img} src={`https://image.tmdb.org/t/p/w500${aboutMovie.poster_path}`} alt={aboutMovie.title} />
        <div className={s.content}>
            <h2 className={s.heading}>{aboutMovie.title}</h2>
            <p className={s.tagline}>{aboutMovie.tagline}</p>
            <div className={s.rates}>
                <span className={s.rate}>{aboutMovie.vote_average} / 10 <span>({aboutMovie.vote_count})</span></span>
                <span className={s.rate}>{aboutMovie.production_countries[0].name} / {aboutMovie.runtime} min. / {aboutMovie.release_date.slice(0, 4)} year</span>
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
        </div>
    </div>
})