import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register, Welcome } from './pages'

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
