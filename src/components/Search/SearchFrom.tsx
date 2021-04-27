import s from './Users.module.scss'
import { Field, Form, Formik } from 'formik'
// import { FilterType } from '../../redux/usersReducer'
import React from 'react'
import { useSelector } from 'react-redux'
// import { getUsersFilter } from '../../redux/usersSelectors'

type PropsType = {
    // onFilterChange: (filter: FilterType) => void
}

type FriendType = 'true' | 'false' | 'null'
type FormType = {
    // term: string
    // friend: FriendType
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

const UsersSearchForm: React.FC<PropsType> = React.memo(({  }) => {

    // const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: any = {
            // term: values.term,
            // friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        // onFilterChange(filter)
        setSubmitting(false)
    }

    return <div className={s.form}>
        <Formik
            enableReinitialize
            // initialValues={{ term: filter.term, friend: '' + filter.friend as FriendType }}
            initialValues={{ }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field className={s.textarea} type="text" name="term" placeholder="Type here to search..." />
                    <div className={s.select}>
                        <Field as="select" name="friend">
                            <option value="null">All Users</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
                        </Field>
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

export default UsersSearchForm