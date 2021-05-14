import s from './Genres.module.scss'
import Select from 'react-dropdown-select'
import React from 'react'
import { GenresType } from '../../types'

type PropsType = {
    genres: Array<GenresType>
    allGenres: Array<GenresType>
    setGenres: (genres: Array<GenresType>) => void
}

export const GenresSelect: React.FC<PropsType> = React.memo(({ setGenres, allGenres, genres }) => {
    return <div className={s.form}>
        <Select name="genres"
            multi
            options={allGenres.map(el => {
                return { label: el.name, value: el.id }
            })}
            values={genres.map(el => {
                return { label: el.name, value: el.id }
            })}
     
            onChange={(value) => setGenres(value.map(el => {
                return { name: el.label, id: el.value }
            }))}
        />
    </div>
})