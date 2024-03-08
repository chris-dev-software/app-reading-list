import { createContext, useState } from 'react'
import data from '../libs/books.json'

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(data.library)
  const [bookList, setBookList] = useState([])

  const addBookToList = (ISBN) => {
    const foundBook = [...books].find(({ book }) => book.ISBN === ISBN)
    if (!foundBook) return

    setBookList(prevList => {
      const newList = [...prevList, foundBook]
      return newList
    })

    setBooks(prevBooks => {
      const newBooks = prevBooks.map(item => {
        if (item.book !== foundBook.book) return item
        item.book.inList = true
        return item
      })

      return newBooks
    })
  }

  const removeBookFromList = (ISBN) => {
    const foundBook = [...bookList].find(({ book }) => book.ISBN === ISBN)

    if (!foundBook) return

    setBookList(prevList => {
      const newList = prevList.filter(item => item.book !== foundBook.book)
      return newList
    })

    setBooks(prevBooks => {
      const newBooks = prevBooks.map(item => {
        if (item.book !== foundBook.book) return item
        item.book.inList = false
        return item
      })

      return newBooks
    })
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
