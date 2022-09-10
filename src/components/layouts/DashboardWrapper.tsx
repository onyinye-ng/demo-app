import React from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { useState } from "react"

const Header: React.FC<{}> = () => {
  const { pathname } = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)
  return (
    <div className="flex items-center justify-between py-6 px-3 container mx-auto">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="lg:w-40 w-32"
        />
      </Link>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-primary-dark"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-primary-dark"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-primary-dark"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <Link
                to="/dashboard"
                className={`${
                  pathname === "/dashboard"
                    ? "border-primary border-b border-gray-400 my-8 uppercase"
                    : "border-transparent border-b border-gray-400 my-8 uppercase"
                } hover:border-primary border-b-4 rounded-sm p-2`}
              >
                Cards
              </Link>
              <Link
                to="/dashboard/activate"
                className={`${
                  pathname === "/dashboard/activate"
                    ? "border-primary border-b border-gray-400 my-8 uppercase"
                    : "border-transparent border-b border-gray-400 my-8 uppercase"
                } hover:border-primary border-b-4 rounded-sm p-2`}
              >
                Activate Card
              </Link>
              <Link
                to="/dashboard/payment"
                className={`${
                  pathname === "/dashboard/payment"
                    ? "border-primary border-b border-gray-400 my-8 uppercase"
                    : "border-transparent border-b border-gray-400 my-8 uppercase"
                } hover:border-primary border-b-4 rounded-sm p-2`}
              >
                Receive Payment
              </Link>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
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
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: #eff4ff;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
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
