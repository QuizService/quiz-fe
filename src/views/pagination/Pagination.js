import React, { useState, useEffect } from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const Pagination = ({ page, size, totalPages, paginate }) => {
  const [startIdx, setStartIdx] = useState(1)
  const [endIdx, setEndIdx] = useState(1)
  const [pageNumbers, setPageNumbers] = useState([])

  const changePages = () => {
    const arr = []
    if (totalPages < 10) {
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i)
      }
    } else {
      const newStartIdx = Math.floor(page / 10) * 10 + 1
      const newEndIdx = newStartIdx + size - 1 > totalPages ? totalPages : newStartIdx + size - 1
      setStartIdx(newStartIdx)
      setEndIdx(newEndIdx)
      for (let i = newStartIdx; i <= newEndIdx; i++) {
        arr.push(i)
      }
    }
    setPageNumbers(arr)
  }

  useEffect(() => {
    changePages()
  }, [page, totalPages, size])

  const goToPrev = () => {
    const newStartIdx = startIdx - size < 1 ? 1 : startIdx - size
    paginate(newStartIdx)
  }

  const goToNext = () => {
    const newStartIdx = startIdx + size > totalPages ? startIdx : startIdx + size
    paginate(newStartIdx)
  }

  const goToPage = (num) => {
    paginate(num)
  }

  return (
    <CPagination>
      <CPaginationItem aria-label="Previous" onClick={goToPrev} disabled={startIdx === 1}>
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {pageNumbers.map((num) => (
        <CPaginationItem key={num} onClick={() => goToPage(num)} active={page === num}>
          {num}
        </CPaginationItem>
      ))}
      <CPaginationItem aria-label="Next" onClick={goToNext} disabled={endIdx === totalPages}>
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}

export default Pagination
