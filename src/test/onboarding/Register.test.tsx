import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
// import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"
// import { createMemoryHistory } from "history"
import App from "../../App"

test("Testing route '/register'", () => {
  const routes = ["/", "/register"]

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={routes}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByRole("heading").innerHTML).toBe("Create Business")
  expect(screen.getByLabelText(/Business Name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Business Email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/Business Telephone/i)).toBeInTheDocument()
})
