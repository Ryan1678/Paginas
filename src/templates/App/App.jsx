import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <footer>
        <Link to={'/login'}
          className='btn btn-sm btn-warning'>
          .
        </Link>
      </footer>
    </div>
  )
}

export default App
