import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import {
  CardActivation,
  CardDetails,
  Cards,
  Dashboard,
  // ErrorBoundary,
  Login,
  ReceivePayment,
  Register,
  Welcome,
} from "./pages"

function App() {
  return (
    <>
      {/* <ErrorBoundary> */}
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
            path="/dashboard/cards/:id"
            element={<CardDetails />}
          />
          <Route
            path="/dashboard/activate"
            element={<CardActivation />}
          />
          <Route
            path="/dashboard/payment"
            element={<ReceivePayment />}
          />
        </Routes>
      </Suspense>
      {/* </ErrorBoundary> */}
    </>
  )
}

export default App
