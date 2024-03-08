import { useEffect, useState } from 'react'
import data from './libs/books.json'
import { RiArrowRightSLine } from 'react-icons/ri'

function App () {
  const [books, setBooks] = useState([])
  const [list, setList] = useState([])
  const [filters, setFilters] = useState({
    max: 0,
    genre: 'all'
  })

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

  const handleChangeRange = (event) => {
    const newRange = Number(event.target.value)
    setFilters({ ...filters, max: newRange })
  }

  const handleChangeSelect = (event) => {
    const newGenre = event.target.value
    setFilters({ ...filters, genre: newGenre })
  }

  const removeBookFromList = (ISBN) => {
    const foundBook = [...list].find(({ book }) => book.ISBN === ISBN)

    if (!foundBook) return

    setList(prevList => {
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

  const filteredBooks = [...books].filter(({ book }) => {
    return (book.pages > filters.max && (book.genre === filters.genre || filters.genre === 'all'))
  })

  const totalBooks = [...filteredBooks].filter(({ book }) => !book.inList).length
  const totalList = [...list].length

  return (
    <div id='app' className='grid grid-cols-12 h-screen p-5 gap-5'>
      <main className='bg-zinc-800 flex flex-col gap-10 col-span-8 rounded-md p-5 overflow-y-auto'>
        <header className='flex flex-col gap-10'>
          <div>
            <h1 className='text-5xl font-semibold mb-2'>{totalBooks} <span className='text-3xl tracking-wide'>libros disponibles</span></h1>
            {
              totalList > 0 && (
                <h2 className='text-3xl font-semibold'>{totalList} <span className='text-xl tracking-wide'>en la lista de lectura</span></h2>
              )
            }
          </div>
          <section className='grid grid-cols-2 gap-10'>
            <div className='flex flex-col gap-5'>
              <label className='text-xl font-medium' htmlFor='pages'>Filtrar por páginas:</label>
              <input onChange={handleChangeRange} min={0} max={1000} value={filters.max} id='pages' type='range' />
            </div>

            <div className='flex flex-col gap-5'>
              <label className='text-xl font-medium' htmlFor='genre'>Filtrar por género:</label>
              <select onChange={handleChangeSelect} className='text-black' value={filters.genre} id='genre'>
                <option value='all'>Todas</option>
                <option value='Fantasía'>Fantasía</option>
                <option value='Ciencia ficción'>Ciencia ficción</option>
                <option value='Zombies'>Zombies</option>
                <option value='Terror'>Terror</option>
              </select>
            </div>
          </section>
        </header>

        <section id='container-books' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-5 overflow-y-auto'>
          {
            filteredBooks.map(({ book }) => (
              <article className={`relative w-full h-full overflow-hidden rounded-md ${book.inList ? 'before:absolute before:inset-0 before:bg-black/80 before:rounded-md' : 'pointer-events-auto group'}`} key={book.ISBN}>
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
            ))
          }
        </section>
      </main>
      {
        list.length > 0 && (
          <aside className='bg-zinc-800 flex flex-col gap-10 col-span-4 rounded-md p-5 overflow-y-auto'>
            <h1 className='text-4xl font-semibold'>Lista de lectura</h1>

            <section id='container-books' className='grid grid-cols-1 lg:grid-cols-2 gap-5 overflow-y-auto'>
              {
            list.map(({ book }) => (
              <article className='relative group' key={book.ISBN}>
                <img className='object-cover rounded-md w-full h-full' src={book.cover} alt={book.title} />
                <div className='absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all inset-0 bg-black/50 flex items-center justify-center text-center flex-col backdrop-blur-sm gap-2 rounded-md px-2'>
                  <h2 className='text-xl'>{book.title}</h2>
                  <button onClick={() => removeBookFromList(book.ISBN)} className='bg-zinc-900 flex items-center gap-2 px-4 py-1 rounded-full'>
                    Retirar
                    <RiArrowRightSLine className='text-xl' />
                  </button>
                </div>
              </article>
            ))
          }
            </section>
          </aside>
        )
      }
    </div>
  )
}

export default App
