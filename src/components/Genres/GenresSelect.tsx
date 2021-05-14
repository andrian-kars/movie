import s from './Genres.module.scss'
import Select from 'react-dropdown-select'
import React, { useState } from 'react'

type PropsType = {
    getMoviesByName: (page: number, movie: string) => void
    setCurrentPage: (page: number) => void
}

type FormType = {
    movie: string
}

const optionsAll = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

export const SearchForm: React.FC<PropsType> = React.memo(({ getMoviesByName, setCurrentPage }) => {
    const [genres, setGenres] = useState([])
    console.log(genres);
    

    const submit = (values: FormType) => {
        getMoviesByName(1, values.movie)
        setCurrentPage(1)
        console.log(genres);
    }

    return <div className={s.form}>
        <Select name="genres"
            multi
            options={optionsAll.map(el => {
                return { label: el.name, value: el.id }
            })}
            values={[]}
            // @ts-ignore
            onChange={(value) => setGenres(value.map(el => el.value).join(','))}
        />
        <button onClick={() => submit}>Send</button>
    </div>
})