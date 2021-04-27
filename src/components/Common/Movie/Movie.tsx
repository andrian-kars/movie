import s from './Movie.module.scss'

type PropsType = {
    id: number
    title: string
    poster: string
    rating: number
}

export const Movie: React.FC<PropsType> = ({ title, poster, rating }) => {
    return <div className={s.movie}>
        <img className={s.image} src={poster} alt={title} />
        <div className={s.info}>
            <h3>{title}</h3>
            <p>{rating}</p>
        </div>
    </div>
}
