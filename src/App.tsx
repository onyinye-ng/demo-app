import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { CardActivation, Checkout, Dashboard, Login, Register, Welcome } from "./pages"

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Welcome />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/dashboard/activate"
            element={<CardActivation />}
          />
          <Route
            path="/dashboard/payment"
            element={<Checkout />}
          />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
