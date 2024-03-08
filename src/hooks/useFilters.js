import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export const useFilters = () => {
  const context = useContext(FiltersContext)

  if (context === undefined) {
    throw new Error('Error del Provaider')
  }

  return context
}
