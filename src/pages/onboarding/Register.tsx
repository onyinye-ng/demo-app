import React from "react"
import { OnboardingWrapper } from "../../components"

export const Register: React.FC<{}> = () => {
  return (
    <OnboardingWrapper>
      <div className="flex justify-center gap-10 text-primary-light">
        <div className="flex flex-col border rounded-md px-6 py-10 gap-4 w-64 md:w-9/12 lg:min-w-fit backdrop-blur-xl bg-white/30 backdrop-brightness-95">
          <div className="mt-2 text-center mb-2">
            <h3 className="antialiased text-3xl font-semibold">Create Demo Business</h3>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <div className="pb-3">
                <label htmlFor="companyName"> Company Name</label>
              </div>
              <div>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="border rounded-md p-2 w-full bg-primary-light text-grey-dark"
                />
              </div>
            </div>
            <div>
              <div className="pb-3">
                <label htmlFor="email"> Email Address </label>
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="border rounded-md p-2 w-full bg-primary-light text-grey-dark"
                />
              </div>
            </div>
            <div>
              <div>
                <input
                  type="checkbox"
                  name="suscribe"
                />
                <label htmlFor="suscribe"> Suscribe to our newsletter</label>
              </div>
            </div>
            <div>
              <div className="text-center mx-auto border rounded-full hover:bg-primary-dark active:bg-primary-dark focus:outline-none focus:ring focus:ring-blue-300">
                <button
                  type="submit"
                  className="p-2 text-primary-light  "
                >
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
