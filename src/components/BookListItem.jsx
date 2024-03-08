import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { useBooks } from '../hooks/useBooks'

function BookListItem ({ book }) {
  const { removeBookFromList } = useBooks()

  return (
    <article className='relative group'>
      <img className='object-cover rounded-md w-full h-full' src={book.cover} alt={book.title} />
      <div className='absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all inset-0 bg-black/50 flex items-center justify-center text-center flex-col backdrop-blur-sm gap-2 rounded-md px-2'>
        <h2 className='text-xl'>{book.title}</h2>
        <button onClick={() => removeBookFromList(book.ISBN)} className='bg-zinc-900 flex items-center gap-2 px-4 py-1 rounded-full'>
          Retirar
          <RiArrowRightSLine className='text-xl' />
        </button>
      </div>
    </article>
  )
}

export default BookListItem
