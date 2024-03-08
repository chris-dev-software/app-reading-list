import { useBooks } from '../hooks/useBooks'
import BookListItem from './BookListItem'

export function BookList () {
  const { bookList } = useBooks()

  return (
    <section id='container-books' className='grid grid-cols-1 lg:grid-cols-2 gap-5 overflow-y-auto'>
      {
        bookList.map(({ book }) => <BookListItem key={book.ISBN} book={book} />)
      }
    </section>
  )
}

export default BookList
