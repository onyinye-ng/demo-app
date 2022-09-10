import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo3.svg"
import { StatusBar } from "./StatusBar"

const Header: React.FC<{}> = () => {
  return (
    <div className="flex justify-center items-center">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="lg:w-40 w-32"
        />
      </Link>
    </div>
  )
}

const Footer: React.FC<{}> = () => {
  return (
    <div className="text-center text-primary-light">
      &copy;&nbsp;Onyinye&nbsp;Technologies&nbsp;2022
    </div>
  )
}

type props = {
  children: JSX.Element | JSX.Element[]
}

export const OnboardingWrapper: React.FC<props> = ({ children }) => {
  return (
    <div className="h-screen bg-primary text-primary-light flex justify-center items-center">
      <div className="h-5/6 w-full flex flex-col justify-between items-center">
        <StatusBar />
        <Header />

        <div className="h-full w-full">{children}</div>

        <Footer />
      </div>
    </div>
  )
}
