import React from 'react'
import Filters from './Filters'
import Header from './Header'
import Books from './Books'
import NoBooks from './NoBooks'
import { useFilters } from '../hooks/useFilters'

function BooksContainer () {
  const { filteredBooks } = useFilters()

  return (
    <main className='bg-zinc-800 flex flex-col gap-10 col-span-8 rounded-md p-5 overflow-y-auto'>
      <Header />

      <Filters />

      {
        filteredBooks.length > 0
          ? <Books />
          : <NoBooks />
      }
    </main>
  )
}

export default BooksContainer
