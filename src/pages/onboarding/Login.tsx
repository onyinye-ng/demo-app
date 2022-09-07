import React from "react"
import { Link } from "react-router-dom"
import { OnboardingWrapper } from "../../components"

export const Login: React.FC<{}> = () => {
  return (
    <OnboardingWrapper>
      <div>
        <Link
          to="/dashboard"
          className="p-3 px-6 text-center rounded-md hover:opacity-90 bg-primary-light text-primary"
        >
          Log into your business
        </Link>
      </div>
    </OnboardingWrapper>
  )
}
