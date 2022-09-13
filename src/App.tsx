import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import {
  CardActivation,
  CardDetails,
  Cards,
  Dashboard,
  Login,
  ReceivePayment,
  Register,
  Welcome,
} from "./pages"

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
            path="/dashboard/cards"
            element={<Cards />}
          />
          <Route
            path="/dashboard/activate"
            element={<CardActivation />}
          />
          <Route
            path="/dashboard/payment"
            element={<ReceivePayment />}
          />
          <Route
            path="/dashboard/:id"
            element={<CardDetails />}
          />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
