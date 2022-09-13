import React, { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OnboardingWrapper, Button, CheckboxInput, Input, Label, TextLink } from "../../components"
import { RegisterCredentials, useAccountStore, useStatusStore } from "../../stores"

export const Register: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { registerBusiness } = useAccountStore()
  const { loading, toast } = useStatusStore()
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    businessName: "",
    email: "",
    telephone: "",
    subscribe: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setCredentials({
      ...credentials,
      [field]: value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    loading(true, "Submitting...", "border-secondary")
    try {
      const resp = await registerBusiness(credentials)
      loading(false)
      if (resp.status === true) {
        toast.success(resp.message)
        navigate("/dashboard")
      } else {
        toast.error(resp.message)
      }
    } catch (error: any) {
      loading(false)
      toast.error(error.message)
    }
  }

  return (
    <OnboardingWrapper>
      <div className="h-3/4 w-5/6 md:w-6/12 md:min-w-fit lg:w-3/12 lg:min-w-fit mx-auto">
        <div className="mt-14 flex flex-col gap-4 justify-start">
          <h3 className="text-3xl w-full text-center font-medium">Create Business</h3>

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

            <div className="my-2 w-full flex gap-2 items-center">
              <CheckboxInput
                type="checkbox"
                required
                defaultChecked={credentials.subscribe}
                id="subscribe"
                onChange={(e) => handleChange("subscribe", e.target.checked)}
              />
              <Label
                htmlFor="subscribe"
                className="m-0"
              >
                Subscribe to our newsletter
              </Label>
            </div>

            <Button
              title="Register"
              type="submit"
              className="mt-4 p-2 bg-secondary text-grey-dark"
            >
              Register Business
            </Button>

            <TextLink
              title="goto-login"
              to="/login"
              className="text-center"
            >
              Log in to business
            </TextLink>
          </form>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
