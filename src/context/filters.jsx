import { createContext, useState } from 'react'
import { useBooks } from '../hooks/useBooks'

export const FiltersContext = createContext()

export const FiltersProvider = ({ children }) => {
  const { books } = useBooks()

  const [filters, setFilters] = useState({
    max: 0,
    genre: 'all'
  })

  const handleChangeRange = (event) => {
    const newRange = Number(event.target.value)
    setFilters({ ...filters, max: newRange })
  }

  const handleChangeSelect = (event) => {
    const newGenre = event.target.value
    setFilters({ ...filters, genre: newGenre })
  }

  const filteredBooks = [...books].filter(({ book }) => {
    return (book.pages > filters.max && (book.genre === filters.genre || filters.genre === 'all'))
  })

  const totalAvailableBooks = [...filteredBooks].filter(({ book }) => !book.inList).length

  return (
    <FiltersContext.Provider value={{
      filteredBooks,
      handleChangeRange,
      handleChangeSelect,
      filters,
      totalAvailableBooks
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
