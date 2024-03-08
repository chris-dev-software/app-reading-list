import { useContext } from 'react'
import { BooksContext } from '../context/books'

export const useBooks = () => {
  const context = useContext(BooksContext)

  if (context === undefined) {
    throw new Error('Error del Provaider')
  }

  return context
}
