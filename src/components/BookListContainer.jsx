import { useBooks } from '../hooks/useBooks'
import BookList from './BookList'
import NoBookList from './NoBookList'

export function BookListContainer () {
  const { bookList } = useBooks()

  return (
    <aside className='bg-zinc-800 flex flex-col gap-10 col-span-4 rounded-md p-5 overflow-y-auto'>
      <h1 className='text-4xl font-semibold'>Lista de lectura</h1>

      {
        bookList.length > 0
          ? <BookList />
          : <NoBookList />
      }

    </aside>
  )
}
