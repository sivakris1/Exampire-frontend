import React from 'react'

import {Route,Routes} from 'react-router-dom'
import Papers from './pages/Papers'
import Exams from './pages/Exams'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Exams/>} />
      <Route path='/page' element={<Papers/>} />
    </Routes>
  )
}

export default App
