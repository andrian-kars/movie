import s from './Genres.module.scss'
import Select from 'react-dropdown-select'
import React from 'react'
import { GenresType } from '../../types'

type PropsType = {
    // getMoviesByName: (page: number, movie: string) => void
    genres: Array<GenresType>
    allGenres: Array<GenresType>
    setGenres: (genres: Array<GenresType>) => void
    setCurrentPage: (page: number) => void
}

export const GenresSelect: React.FC<PropsType> = React.memo(({ genres, setGenres, allGenres, setCurrentPage }) => {
    const submit = () => {
        // getMoviesByName(1, values.movie)
        setCurrentPage(1)
        console.log(genres.map(el => el.id).join(','));
    }

    return <div className={s.form}>
        <Select name="genres"
            multi
            options={allGenres.map(el => {
                return { label: el.name, value: el.id }
            })}
            values={[]}
     
            onChange={(value) => setGenres(value.map(el => {
                return { name: el.label, id: el.value }
            }))}
        />
        <button onClick={() => submit()}>Send</button>
    </div>
})