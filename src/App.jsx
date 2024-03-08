import { BookListContainer } from './components/BookListContainer'
import BooksContainer from './components/BooksContainer'
import { BooksProvider } from './context/books'
import { FiltersProvider } from './context/filters'

function App () {
  return (
    <div id='app' className='grid grid-cols-12 h-screen p-5 gap-5'>
      <BooksProvider>

        <FiltersProvider>
          <BooksContainer />
        </FiltersProvider>

        <BookListContainer />

      </BooksProvider>
    </div>
  )
}

export default App
