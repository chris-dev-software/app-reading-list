import { createContext, useEffect, useState } from 'react'
import data from '../libs/books.json'

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const isLocalStorage = JSON.parse(window.localStorage.getItem('books'))
    return isLocalStorage || data.library
  })
  const [bookList, setBookList] = useState(() => {
    const isLocalStorage = JSON.parse(window.localStorage.getItem('bookList'))
    return isLocalStorage || []
  })

  const addBookToList = (ISBN) => {
    const foundBook = [...books].find(({ book }) => book.ISBN === ISBN)
    if (!foundBook) return

    const newList = [...bookList, foundBook]

    setBookList(newList)

    const newBooks = books.map(item => {
      if (item.book !== foundBook.book) return item
      item.book.inList = true
      return item
    })

    setBooks(newBooks)

    window.localStorage.setItem('books', JSON.stringify(newBooks))
    window.localStorage.setItem('bookList', JSON.stringify(newList))
  }

  useEffect(() => {
    const localStorageDataBooks = (event) => {
      setBooks(prevBooks => {
        if (event.key === 'books') {
          const newBooks = JSON.parse(window.localStorage.getItem('books'))
          return newBooks
        }
        return prevBooks
      })
      setBookList(prevList => {
        if (event.key === 'bookList') {
          const newBookList = JSON.parse(window.localStorage.getItem('bookList'))
          return newBookList
        }
        return prevList
      })
    }

    window.addEventListener('storage', localStorageDataBooks)

    return () => window.removeEventListener('storage', localStorageDataBooks)
  }, [])

  const removeBookFromList = (ISBN) => {
    const foundBook = [...bookList].find(({ book }) => book.ISBN === ISBN)

    if (!foundBook) return

    const newList = [...bookList].filter(item => item.book !== foundBook.book)

    setBookList(newList)

    const newBooks = [...books].map(item => {
      if (item.book !== foundBook.book) return item
      item.book.inList = false
      return item
    })

    setBooks(newBooks)

    window.localStorage.setItem('books', JSON.stringify(newBooks))
    window.localStorage.setItem('bookList', JSON.stringify(newList))
  }

  const totalBookList = [...bookList].length

  return (
    <BooksContext.Provider value={{
      removeBookFromList,
      addBookToList,
      books,
      bookList,
      totalBookList
    }}
    >
      {children}
    </BooksContext.Provider>
  )
}
