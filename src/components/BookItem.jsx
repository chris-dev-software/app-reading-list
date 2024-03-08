import { RiArrowRightSLine } from 'react-icons/ri'
import { useBooks } from '../hooks/useBooks'

export function BookItem ({ book }) {
  const { addBookToList } = useBooks()

  return (
    <article className={`relative w-full h-full overflow-hidden rounded-md ${book.inList ? 'before:absolute before:inset-0 before:bg-black/80 before:rounded-md' : 'pointer-events-auto group'}`}>
      <img className='object-cover w-full h-full' src={book.cover} alt={book.title} />
      <div className='absolute inset-0 bg-black/80 text-center opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all'>
        <div className='flex flex-col h-full items-center justify-center p-2 gap-2'>
          <h2 className='text-xl'>{book.title}</h2>
          <button onClick={() => addBookToList(book.ISBN)} className='bg-zinc-900 flex items-center px-4 py-1 rounded-full'>
            Mover
            <RiArrowRightSLine className='text-xl' />
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookItem
