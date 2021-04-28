import s from './Search.module.scss'
import { Field, Form, Formik } from 'formik'
import React from 'react'

type PropsType = {
    getMoviesByName: (page: number, movie: string) => void
}

type FormType = {
    movie: string
}

type ValidType = {
    movie?: string
}

const validate = (values: any) => {
    const errors: ValidType = {}
    if (!values.movie) {
        errors.movie = 'You can\'t search for nothing'
    }
    if (values.movie.length > 30) {
        errors.movie = 'You are gay'
    }
    return errors
}

export const SearchForm: React.FC<PropsType> = React.memo(({ getMoviesByName }) => {

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        getMoviesByName(1, values.movie)
        setSubmitting(false)
    }

    return <div className={s.form}>
        <Formik
            enableReinitialize
            initialValues={{ movie: '' }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={validate}
            onSubmit={submit}
        >
            {({ errors, isSubmitting }) => (
                <Form>
                    {errors.movie && <span className={s.emptyError}>{errors.movie}</span>}
                    <Field className={s.textarea} maxLength="30" type="text" name="movie" placeholder="Type here to search..." />
                    <div className={s.select}>
                        <button className={s.button} type="submit" disabled={isSubmitting}>
                            <svg viewBox="0 0 20 20">
                                <path d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
								s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"></path>
                            </svg>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
})