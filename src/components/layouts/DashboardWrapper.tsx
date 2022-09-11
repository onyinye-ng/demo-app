import React from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { StatusBar } from "./StatusBar"
import { useState } from "react"
import { IconButton } from "../forms"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"

const Header: React.FC<{}> = () => {
  const { pathname } = useLocation()
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex items-center justify-between py-6 px-3 container mx-auto">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="lg:w-40 w-32"
        />
      </Link>

      <IconButton
        title="toggle-menu"
        className="block md:hidden hover:bg-grey-light hover:bg-opacity-50"
        onClick={() => setNavOpen(true)}
      >
        <Bars3Icon className="w-8 h-8" />
      </IconButton>

      <div
        className={`${
          navOpen === true
            ? "show absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-start gap-10 pt-40 p-20 md:hidden bg-primary-light z-10"
            : "hidden md:flex md:flex-row md:gap-10"
        }`}
      >
        {navOpen && (
          <IconButton
            title="toggle-menu"
            className="block absolute top-6 right-6 md:hidden w-fit hover:bg-grey-light hover:bg-opacity-50"
            onClick={() => setNavOpen(false)}
          >
            <XMarkIcon className="w-8 h-8" />
          </IconButton>
        )}

        <Link
          to="/dashboard"
          onClick={() => {
            navOpen === true && setNavOpen(false)
          }}
          className={`${
            pathname === "/dashboard" ? "border-primary" : "border-transparent "
          } hover:border-primary border-b-4 rounded-sm p-2`}
        >
          Cards
        </Link>
        <Link
          to="/dashboard/activate"
          onClick={() => {
            navOpen === true && setNavOpen(false)
          }}
          className={`${
            pathname === "/dashboard/activate" ? "border-primary" : "border-transparent "
          } hover:border-primary border-b-4 rounded-sm p-2`}
        >
          Activate Card
        </Link>
        <Link
          to="/dashboard/payment"
          onClick={() => {
            navOpen === true && setNavOpen(false)
          }}
          className={`${
            pathname === "/dashboard/payment" ? "border-primary" : "border-transparent "
          } hover:border-primary border-b-4 rounded-sm p-2`}
        >
          Receive Payment
        </Link>
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
}

export const DashboardWrapper: React.FC<props> = ({ children }) => {
  return (
    <div className="h-screen bg-primary-light text-grey-dark overflow-auto">
      <div className="container mx-auto h-full">
        <StatusBar />
        <Header />

        <div className="h-[90%]">
          <div className="h-[90%] p-3">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
