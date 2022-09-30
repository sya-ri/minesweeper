import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlayApp from './PlayApp'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
