import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"
// import { createMemoryHistory } from "history"
import App from "../../App"

// Visit this for guidance
// https://testing-library.com/docs/
// const history = createMemoryHistory()

test("Testing route '/'", () => {
  const routes = ["/"]

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={routes}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByRole("heading").innerHTML).toBe("Onyinye Technologies")
  expect(screen.getByText(/Create a Demo Business/i)).toBeInTheDocument()
  expect(screen.getByText(/Log in to your Demo Business/i)).toBeInTheDocument()

  userEvent.click(screen.getByText(/Create a Demo Business/i))
  expect(screen.getByText(/Create Business/i)).toBeInTheDocument()
})
