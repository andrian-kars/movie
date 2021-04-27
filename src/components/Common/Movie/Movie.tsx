import s from './Movie.module.scss'

type PropsType = {
    id: number
    title: string
    poster: string
    rating: number
}

export const Movie: React.FC<PropsType> = ({ title, poster, rating }) => {
    return <div className={s.movie}>
        <div className={s.image} style={{ backgroundImage: `url('${poster}')` }}></div>
        <div className={s.info}>
            <h3>{title}</h3>
            <p>{rating}</p>
        </div>
    </div>
}
