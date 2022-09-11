import React from "react"
import { Link } from "react-router-dom"
import { OnboardingWrapper } from "../../components"

export const Login: React.FC<{}> = () => {
  return (
    <OnboardingWrapper>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-64 md:w-96 lg:w-80 bord er rounded-md p-8">
          <div className="text-center pb-4 text-2xl">
            <h3>Sign in</h3>
          </div>
          <div>
            <form className="flex flex-col gap-4">
              <div>
                <div className="pb-3">
                  <label htmlFor="email">Email Address</label>
                </div>
                <div>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    className="p-2 border rounded-sm w-full text-grey-dark bg-primary-light"
                  />
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="remember"
                  className="bg-primary-light"
                />
                <label htmlFor="remember"> Remember Me</label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="rounded-md py-2 w-full bg-primary-dark hover:opacity-90 text-primary-light"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
