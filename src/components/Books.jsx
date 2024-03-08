import { useFilters } from '../hooks/useFilters'
import BookItem from './BookItem'

export function Books () {
  const { filteredBooks } = useFilters()

  return (
    <section id='container-books' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-5 overflow-y-auto'>
      {
        filteredBooks.map(({ book }) => <BookItem key={book.ISBN} book={book} />)
      }
    </section>
  )
}

export default Books
