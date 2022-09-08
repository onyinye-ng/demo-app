import React, { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OnboardingWrapper } from "../../components"
import { Button, CheckboxInput, Input, Label, TextButton } from "../../components/forms"

export const Register: React.FC<{}> = () => {
  const navigate = useNavigate()
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [credentials, setCredentials] = useState({
    businessName: "",
    email: "",
    telephone: "",
    token: "",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setCredentials({
      ...credentials,
      [field]: value,
    })
    if (field === "email") setIsVerifying(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isVerifying === false) {
      setIsVerifying(true)
      return
    }

    navigate("/dashboard")
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
                onChange={(e) => handleChange("businessName", e.target.value)}
                value={credentials.businessName}
                id="businessName"
                autoComplete="off"
                placeholder="ex. XYZ Company"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="email">Business Email</Label>
              <Input
                onChange={(e) => handleChange("email", e.target.value)}
                type="text"
                value={credentials.email}
                id="email"
                autoComplete="email"
                required
                placeholder="ex. xyz.company@example.com"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="telephone">Business Telephone</Label>
              <Input
                onChange={(e) => handleChange("telephone", e.target.value)}
                type="text"
                value={credentials.telephone}
                id="telephone"
                autoComplete="tel"
                required
                placeholder="ex. +234"
              />
            </div>

            <div className="my-2 w-full flex gap-1 items-center">
              <CheckboxInput
                type="checkbox"
                required
                id="suscribe"
              />
              <Label
                htmlFor="suscribe"
                className="m-0"
              >
                Subscribe to our newsletter
              </Label>
            </div>

            {isVerifying && (
              <div className="w-full flex flex-col gap-1">
                <Label htmlFor="token">Verification Token</Label>
                <Input
                  onChange={(e) => handleChange("token", e.target.value)}
                  maxLength={6}
                  id="token"
                  autoComplete="off"
                  placeholder="123456"
                  value={credentials.token}
                />
                <TextButton
                  type="button"
                  className="self-end"
                  title="Resend code"
                >
                  Resend Code
                </TextButton>
              </div>
            )}

            <Button
              title="Register"
              type="submit"
              className="mt-5 p-2 bg-secondary text-grey-dark"
            >
              {isVerifying === true ? "Register" : "Verify Email"}
            </Button>
          </form>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
