import React from "react"
import { Link } from "react-router-dom"
import { OnboardingWrapper } from "../../components"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

export const Welcome: React.FC<{}> = () => {
  return (
    <OnboardingWrapper>
      <div className="h-4/5 w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-7/12 gap-2">
          <h1 className="text-4xl font-bold text-center mt-10">Onyinye Technologies</h1>

          <span className="text-opacity-90 text-center mt-3">
            Onyinye is a business that manufactures and delivers Gift-Cards to businesses across
            Nigeria and Africa.
          </span>

          <div className="flex flex-col w-auto gap-2 mt-16">
            <Link
              to="/register"
              className="p-3 px-6 text-center rounded-md hover:opacity-90 bg-primary-light text-primary"
            >
              Create a Demo Business
            </Link>
            <Link
              to="/login"
              className="p-3 mt-3 px-6 text-center rounded-md hover:opacity-90 text-primary-light flex items-center gap-3 hover:scale-105"
            >
              <span>Log in to your Demo Business</span>
              <ArrowRightIcon
                width={18}
                className=""
              />
            </Link>
          </div>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
