import { createContext, useState } from 'react'
import { useBooks } from '../hooks/useBooks'

export const FiltersContext = createContext()

export const FiltersProvider = ({ children }) => {
  const { books } = useBooks()

  const [filters, setFilters] = useState(() => {
    const isLocalStorage = JSON.parse(window.localStorage.getItem('filters'))
    return isLocalStorage || {
      max: 0,
      genre: 'all'
    }
  })

  const handleChangeRange = (event) => {
    const newRange = Number(event.target.value)
    const newFilters = { ...filters, max: newRange }
    setFilters(newFilters)

    window.localStorage.setItem('filters', JSON.stringify(newFilters))
  }

  const handleChangeSelect = (event) => {
    const newGenre = event.target.value
    const newFilters = { ...filters, genre: newGenre }
    setFilters(newFilters)

    window.localStorage.setItem('filters', JSON.stringify(newFilters))
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
