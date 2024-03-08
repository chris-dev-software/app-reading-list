import { useFilters } from '../hooks/useFilters'

function Filters () {
  const { filters, handleChangeRange, handleChangeSelect } = useFilters()

  return (

    <section className='grid grid-cols-2 gap-10'>
      <div className='flex flex-col gap-5'>
        <label className='text-xl font-medium' htmlFor='pages'>Filtrar por páginas:</label>
        <input onChange={handleChangeRange} min={0} max={700} value={filters.max} id='pages' type='range' />
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

  )
}

export default Filters
