import React, { FormEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { OnboardingWrapper, Button, Input, Label, TextLink } from "../../components"
import { useAccountStore, useForm, useStatusStore } from "../../stores"
import { once } from "../../utils"

export const Login: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { login } = useAccountStore()
  const { loading, toast } = useStatusStore()
  const { credentials, errors, setErrors, setCredential, setCredentials } = useForm()

  // set initial credentials
  useEffect(() => {
    return once(() => {
      setCredentials({
        email: "",
        telephone: "",
      })
    })
  }, [setCredentials])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    loading(true, "Logging in...", "border-secondary")
    try {
      const resp = await login(credentials)
      loading(false)
      if (resp.status === true) {
        toast.success(resp.message)
        navigate("/dashboard")
      } else {
        setErrors(resp.errors)
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
          <h3 className="text-3xl w-full text-center font-medium">Log in to Business</h3>

          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col gap-3"
          >
            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="email">Business Email</Label>
              <Input
                type="email"
                id="email"
                defaultValue={credentials.email}
                onChange={(e) => setCredential("email", e.target.value)}
                autoComplete="email"
                required
                placeholder="ex. xyz.company@example.com"
                errors={errors.email}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <Label htmlFor="telephone">Business Telephone</Label>
              <Input
                type="tel"
                id="telephone"
                defaultValue={credentials.telephone}
                onChange={(e) => setCredential("telephone", e.target.value)}
                autoComplete="tel"
                required
                placeholder="ex. +234"
                errors={errors.telephone}
              />
            </div>

            <Button
              title="Register"
              type="submit"
              className="mt-4 p-2 bg-secondary text-grey-dark"
            >
              Login
            </Button>

            <TextLink
              title="goto-register"
              to="/register"
              className="text-center"
            >
              Register business instead
            </TextLink>
          </form>
        </div>
      </div>
    </OnboardingWrapper>
  )
}
