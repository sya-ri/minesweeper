import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlayApp from './PlayApp'
import BlindCheck from './BlindCheck'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PlayApp />} />
        <Route path="blind-check" element={<BlindCheck />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
