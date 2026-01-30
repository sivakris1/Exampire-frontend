import React from 'react'

import {Route,Routes} from 'react-router-dom'
import Papers from './pages/Papers'

const App = () => {
  return (
    <Routes>
      <Route path='/page' element={<Papers/>} />
    </Routes>
  )
}

export default App
