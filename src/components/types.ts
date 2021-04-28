export type MovieType = {
    adult: boolean
    tagline: string
    backdrop_path: string
    genre_ids: Array<number>
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    genres: Array<{
        id: number
        name: string
    }>
    runtime: number
    budget: number
    production_countries: Array<{ name: string }>
    spoken_languages: Array<{ name: string }>
}