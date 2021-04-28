import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSetAboutMovie } from '../../redux/searchReducer'
import { AppStateType } from '../../redux/store'
import s from './About.module.scss'
import { MovieType } from '../types'
import { useParams } from 'react-router-dom'

export const About: React.FC = () => {
    const aboutMovie: MovieType = useSelector((state: AppStateType) => state.search.aboutMovie)
    const dispatch = useDispatch()
    const params: { aboutID: string | undefined } = useParams()

    useEffect(() => {
        const userID = params.aboutID
        const setAboutMovie = (id: number) => { dispatch(onSetAboutMovie(id)) }
        !userID ? setAboutMovie(69) : setAboutMovie(+userID)
    }, [dispatch, params])
    
    
    return <div className={s.about}>
        <div>
            {aboutMovie.id}
            {aboutMovie.title}
            {`https://image.tmdb.org/t/p/w500${aboutMovie.poster_path}`}
            {aboutMovie.vote_average}
        </div>
    </div>
}
