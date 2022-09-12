import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Dashboard, Login, ReceivePayment, Register, Welcome } from "./pages"
import { CardDetails } from "./pages/dashboard/CardDetails"

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
            element={<Dashboard />}
          />
          <Route
            path="/dashboard/payment"
            element={<ReceivePayment />}
          />
          <Route
            path="/dashboard/cardDetails"
            element={<CardDetails />}
          />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
