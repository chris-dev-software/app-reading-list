import { useEffect, useState } from 'react'
import data from './libs/books.json'

function App () {
  const [books, setBooks] = useState([])

  useEffect(() => {
    setBooks(data.library)
  }, [])

  const totalBooks = books.length

  return (
    <div id='app' className='grid grid-cols-12 h-screen p-5 gap-5'>
      <main className='bg-zinc-800 flex flex-col gap-10 col-span-8 rounded-md p-5 overflow-y-auto'>
        <header className='flex flex-col gap-10'>
          <h1 className='text-5xl font-semibold'>{totalBooks} <span className='text-3xl tracking-wide'>libros disponibles</span></h1>
          <section className='grid grid-cols-2 gap-10'>
            <div className='flex flex-col gap-5'>
              <label className='text-xl font-medium' htmlFor='pages'>Filtrar por páginas:</label>
              <input id='pages' type='range' />
            </div>

            <div className='flex flex-col gap-5'>
              <label className='text-xl font-medium' htmlFor='genre'>Filtrar por género:</label>
              <select id='genre'>
                <option value=''>Todas</option>
              </select>
            </div>
          </section>
        </header>

        <section id='container-books' className='grid-books gap-5 overflow-y-auto'>
          {
            books.map(({ book }) => (
              <article className='flex' key={book.ISBN}>
                <img className='object-cover' src={book.cover} alt='' />
              </article>
            ))
          }
        </section>
      </main>
      <aside className='bg-zinc-800 col-span-4 rounded-md p-5'>
        <h1 className='text-4xl font-semibold'>Lista de lectura</h1>
      </aside>
    </div>
  )
}

export default App
