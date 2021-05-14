import s from './Movie.module.scss'
import imagePlaceholder from './../../../images/imagePlaceholder.jpg'
import { truncateString } from '../../../utils/truncateString'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../redux/store'

type PropsType = {
    id: number
    title: string
    poster: string
    rating: number
    genresID: Array<number>
    release: string
}

export const Movie: React.FC<PropsType> = ({ title, poster, rating, id, genresID, release }) => {
    const allGenres = useSelector((state: AppStateType) => state.genres.allGenres)
    
    const genresNames = allGenres
        .map(el => genresID.includes(el.id) ? el.name : '')
        .filter(el => el.length !== 0)
    
    // Img load slow internet
    const [loaded, setLoaded] = useState(false)

    return <NavLink className={s.movie} to={'/about/' + id}>
        <img onLoad={() => setLoaded(true)} className={s.image} src={poster === null || !loaded ? imagePlaceholder : `https://image.tmdb.org/t/p/w500${poster}`} alt={title} />
        <div className={s.info}>
            <h3>{truncateString(title, 25)}</h3>
            <p>{rating ? `${rating} / 10` : 'Rating is not availible'}</p>
        </div>
        <div className={s.genres}>
            {genresNames.length === 0 ? <span key={'69'}>No genres</span>
                : genresNames.map(el => <span key={'' + el}>{el}</span>)}
            <p className={s.release}>{release.replaceAll('-', '.')}</p>
        </div>
    </NavLink>
}