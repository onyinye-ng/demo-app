import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid"
import React, { FormEvent, useEffect } from "react"
import { Card, DashboardWrapper, Label, PrefixInput } from "../../components"
import { Button } from "../../components"
import { useCardStore, useForm, useStatusStore } from "../../stores"
import { clearInput, once } from "../../utils"

export const Cards: React.FC<{}> = () => {
  const { loading, toast } = useStatusStore()
  const { createCard, cards } = useCardStore()
  const { credentials, errors, setCredential, setCredentials, setErrors } = useForm()

  // set initial credentials
  useEffect(() => {
    return once(() => {
      setCredentials({
        amount: 0,
      })
    })
  }, [setCredentials])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      loading(true, "Creating card...", "border-secondary", "bg-primary-dark")
      const resp = await createCard(credentials)
      loading(false)
      if (resp.status === true) {
        clearInput("amount")
        toast.success(resp.message, false)
      } else {
        setErrors(resp.errors)
        toast.error(resp.message)
      }
    } catch (error: any) {
      loading(false)
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <DashboardWrapper>
      <div className="h-full w-full md:w-8/12 lg:w-5/12 mx-auto">
        <div className="md:mt-14 mt-5 flex flex-col gap-4 justify-start">
          <h3 className="text-3xl font-medium">Create card</h3>

          <div className="flex flex-col gap-8">
            <form
              id="paymentForm"
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              <div className="w-full flex flex-col gap-1">
                <Label htmlFor="amount">Amount</Label>
                <PrefixInput
                  id="amount"
                  type="number"
                  min={500}
                  defaultValue={credentials.amount}
                  onChange={(e) => setCredential("amount", e.target.value)}
                  className="border border-grey-light"
                  required
                  placeholder="ex. 500"
                  affix={<span className="text-grey-dark">NGN</span>}
                  errors={errors.amount}
                />
                <div></div>
              </div>

              <Button
                title="Create card"
                type="submit"
                className="mt-4 bg-primary text-primary-light"
              >
                Create
              </Button>
            </form>

            <hr className="text-grey-light" />

            <div className="flex flex-col gap-3 mb-10">
              <div className="w-full bg-scondary-dark flex justify-between flex-wrap gap-0">
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    card={card!}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center mx-1">
                <Button
                  title="previous"
                  className="py-2 text-primary-dark hover:bg-grey-light focus:bg-grey-light flex items-center gap-1"
                >
                  <ArrowLongLeftIcon className="w-4" />
                  <span>Previous</span>
                </Button>
                <Button
                  title="next"
                  className="py-2 text-primary-dark hover:bg-grey-light focus:bg-grey-light flex items-center gap-1"
                >
                  <span>Next</span>
                  <ArrowLongRightIcon className="w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}
