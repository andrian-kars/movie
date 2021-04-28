// import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../../redux/searchReducer'
import s from './Paginator.module.scss'

type PropsType = {
    totalPages: number
    currentPage: number
}

export const Paginator: React.FC<PropsType> = ({ totalPages, currentPage = 1, } ) => {
    const dispatch = useDispatch()
    const onPageChange = (page: number) => dispatch(actions.setCurrentPage(page))
    
    const maxPages: number = 3

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1
    } else if (currentPage > totalPages) {
        currentPage = totalPages
    }

    let startPage: number, endPage: number
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1
        endPage = totalPages
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1
            endPage = maxPages
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1
            endPage = totalPages
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage
            endPage = currentPage + maxPagesAfterCurrentPage
        }
    }

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)


    return <div className={s.pagination}>
        {pages.map(p => {
            return <button key={p} className={`${currentPage === p && s.selectedPage} ${s.pages}`}
            onClick={() => { onPageChange(p) }}>{p}</button>
        })}
    </div>
}