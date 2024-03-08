import { useEffect, useState } from 'react'
import data from './libs/books.json'
import { RiArrowRightSLine } from 'react-icons/ri'

function App () {
  const [books, setBooks] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    setBooks(data.library)
  }, [])

  const addBookToList = (ISBN) => {
    const foundBook = [...books].find(({ book }) => book.ISBN === ISBN)
    if (!foundBook) return

    setList(prevList => {
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

        <section id='container-books' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-y-auto'>
          {
            books.map(({ book }) => (
              <article className={`relative ${book.inList ? 'before:absolute before:inset-0 before:bg-black/80 before:rounded-md' : 'pointer-events-auto group'}`} key={book.ISBN}>
                <img className='object-cover rounded-md w-full h-full' src={book.cover} alt={book.title} />
                <div className='absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all inset-0 bg-black/50 flex items-center justify-center text-center flex-col backdrop-blur-sm gap-2 rounded-md px-2'>
                  <h2 className='text-xl'>{book.title}</h2>
                  <button onClick={() => addBookToList(book.ISBN)} className='bg-zinc-900 flex items-center gap-2 px-4 py-1 rounded-full'>
                    Mover a la lista de lectura
                    <RiArrowRightSLine className='text-xl' />
                  </button>
                </div>
              </article>
            ))
          }
        </section>
      </main>
      <aside className='bg-zinc-800 flex flex-col col-span-4 rounded-md p-5 overflow-y-auto'>
        <h1 className='text-4xl font-semibold'>Lista de lectura</h1>

        <section id='container-books' className='grid grid-cols-1 sm:grid-cols-2  gap-10 overflow-y-auto'>
          {
            list.map(({ book }) => (
              <article className='relative group' key={book.ISBN}>
                <img className='object-cover rounded-md w-full h-full' src={book.cover} alt={book.title} />
                <div className='absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all inset-0 bg-black/50 flex items-center justify-center text-center flex-col backdrop-blur-sm gap-2 rounded-md px-2'>
                  <h2 className='text-xl'>{book.title}</h2>
                  <button className='bg-zinc-900 flex items-center gap-2 px-4 py-1 rounded-full'>
                    Mover a la lista de disponibles
                    <RiArrowRightSLine className='text-xl' />
                  </button>
                </div>
              </article>
            ))
          }
        </section>
      </aside>
    </div>
  )
}

export default App
