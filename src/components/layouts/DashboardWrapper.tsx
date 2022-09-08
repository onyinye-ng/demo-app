import React from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/logo.svg"

const Header: React.FC<{}> = () => {
  const { pathname } = useLocation()

  return (
    <div className="h-[10%] sticky top-0">
      <div className="backdrop-blur backdrop:bg-grey px-3 py-5 flex justify-between items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="lg:w-40 w-32"
          />
        </Link>

        <div className="flex lg:flex-row lg:gap-5">
          <Link
            to="/dashboard"
            className={`${
              pathname === "/dashboard" ? "border-primary" : "border-transparent "
            } hover:border-primary border-b-4 rounded-sm p-2`}
          >
            Cards
          </Link>
          <Link
            to="/dashboard/activate"
            className={`${
              pathname === "/dashboard/activate" ? "border-primary" : "border-transparent "
            } hover:border-primary border-b-4 rounded-sm p-2`}
          >
            Activate Card
          </Link>
          <Link
            to="/dashboard/payment"
            className={`${
              pathname === "/dashboard/payment" ? "border-primary" : "border-transparent "
            } hover:border-primary border-b-4 rounded-sm p-2`}
          >
            Receive Payment
          </Link>
        </div>
      </div>
    </div>
  )
}

const Footer: React.FC<{}> = () => {
  return (
    <div className="sticky bottom-0 h-[10%] p-3">
      <div className="py-5">&copy;&nbsp;Onyinye&nbsp;Technologies&nbsp;2022</div>
    </div>
  )
}

type props = {
  children: JSX.Element | JSX.Element[]
  noContainer?: boolean
  className?: string
}

export const DashboardWrapper: React.FC<props> = ({ children }) => {
  return (
    <div className="h-screen bg-primary-light text-grey-dark overflow-auto">
      <div className="container mx-auto h-full">
        <Header />

        <div className="h-[90%]">
          <div className="h-[90%] p-3">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
