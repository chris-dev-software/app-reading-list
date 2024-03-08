import { useBooks } from '../hooks/useBooks'
import { useFilters } from '../hooks/useFilters'

export function Header () {
  const { totalAvailableBooks } = useFilters()
  const { totalBookList } = useBooks()

  return (
    <header className='flex flex-col gap-2'>
      <h1 className='text-5xl font-semibold'>{totalAvailableBooks} <span className='text-3xl tracking-wide'>libros disponibles</span></h1>
      {
        totalBookList > 0 && (
          <h2 className='text-3xl font-semibold'>{totalBookList} <span className='text-xl tracking-wide'>en la lista de lectura</span></h2>
        )
      }
    </header>
  )
}

export default Header
