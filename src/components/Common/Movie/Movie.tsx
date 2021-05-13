import s from './Movie.module.scss'
import imagePlaceholder from './../../../images/imagePlaceholder.jpg'
import { truncateString } from '../../../utils/truncateString'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

type PropsType = {
    id: number
    title: string
    poster: string
    rating: number
}

export const Movie: React.FC<PropsType> = ({ title, poster, rating, id }) => {
    // Img load slow internet
    const [loaded, setLoaded] = useState(false)

    return <NavLink className={s.movie} to={'/about/' + id}>
        <img onLoad={() => setLoaded(true)} className={s.image} src={poster === null || !loaded ? imagePlaceholder : `https://image.tmdb.org/t/p/w500${poster}`} alt={title} />
        <div className={s.info}>
            <h3>{truncateString(title, 25)}</h3>
            <p>{rating ? `${rating} / 10` : 'Rating is not availible'}</p>
        </div>
    </NavLink>
}