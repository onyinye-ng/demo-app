import React, { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OnboardingWrapper } from "../../components"
import { Button, CheckboxInput, Input, Label } from "../../components/forms"
import { RegisterCredentials, useAccountStore } from "../../stores"

export const Register: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { registerBusiness } = useAccountStore()
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    businessName: "",
    email: "",
    telephone: "",
    subscribe: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setCredentials({
      ...credentials,
      [field]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const resp = await registerBusiness(credentials)
      console.log(resp)
      if (resp.status === true) {
        alert(resp.message)
        navigate("/dashboard")
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <OnboardingWrapper>
      <div className="h-3/4 w-5/6 md:w-6/12 md:min-w-fit lg:w-3/12 lg:min-w-fit mx-auto">
        <div className="mt-14 flex flex-col gap-4 justify-start">
          <h3 className="text-3xl w-full text-center">Create Business</h3>

          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col gap-3"
          >
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                defaultValue={credentials.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                autoComplete="name"
                required
                placeholder="ex. XYZ Company"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="email">Business Email</Label>
              <Input
                type="email"
                id="email"
                defaultValue={credentials.email}
                onChange={(e) => handleChange("email", e.target.value)}
                autoComplete="email"
                required
                placeholder="ex. xyz.company@example.com"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="telephone">Business Telephone</Label>
              <Input
                type="tel"
                id="telephone"
                defaultValue={credentials.telephone}
                onChange={(e) => handleChange("telephone", e.target.value)}
                autoComplete="tel"
                required
                placeholder="ex. +234"
              />
            </div>

            <div className="my-2 w-full flex gap-1 items-center">
              <CheckboxInput
                type="checkbox"
                required
                defaultChecked={credentials.subscribe}
                id="suscribe"
                onChange={(e) => handleChange("suscribe", e.target.checked)}
              />
              <Label
                htmlFor="suscribe"
                className="m-0"
              >
                Subscribe to our newsletter
              </Label>
            </div>

            <Button
              title="Register"
              type="submit"
              className="mt-5 p-2 bg-secondary text-grey-dark"
            >
              Register Business
            </Button>
          </form>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
