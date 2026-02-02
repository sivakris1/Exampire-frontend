import React from 'react'

import {Route,Routes} from 'react-router-dom'
import Papers from './pages/Papers'
import Exams from './pages/Exams'
import PaperDetails from './pages/PaperDetails'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Exams/>} />
      <Route path="/papers" element={<Papers />} />
      <Route path="/papers/:id" element={<PaperDetails/>} />
    </Routes>
  )
}

export default App
