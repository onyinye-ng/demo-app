import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid"
import React, { FormEvent, useState } from "react"
import { Card, DashboardWrapper, Label, PrefixInput } from "../../components"
import { Button } from "../../components"
import { Card as CardType, useStatusStore } from "../../stores"

export const Dashboard: React.FC<{}> = () => {
  const { loading } = useStatusStore()
  const giftCard: CardType[] = [
    {
      id: "12345",
      business: "12345",
      amount: 10000,
      balance: 10000,
      couponCode: "1234567890AE",
      status: "inactive",
      created: Date.now().toString(),
    },
    {
      id: "12345",
      business: "12345",
      amount: 10000,
      balance: 10000,
      couponCode: "1234567890AE",
      status: "inactive",
      created: Date.now().toString(),
    },
    {
      id: "12345",
      business: "12345",
      amount: 10000,
      balance: 10000,
      couponCode: "1234567890AE",
      status: "inactive",
      created: Date.now().toString(),
    },
    {
      id: "12345",
      business: "12345",
      amount: 10000,
      balance: 10000,
      couponCode: "1234567890AE",
      status: "inactive",
      created: Date.now().toString(),
    },
  ]

  const [credentials, setCredentials] = useState({
    amount: 0,
    couponCode: "",
    qrCodeValue: "",
  })

  const handleChange = (field: string, value: string | boolean) => {
    console.log(field, value)
    setCredentials({
      ...credentials,
      [field]: value,
    })
  }

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    console.log(credentials)
    loading(true, "Making payment...", "border-secondary", "bg-primary-dark")
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
                  min={1}
                  defaultValue={credentials.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  className="border border-grey-light"
                  required
                  placeholder="ex. 500"
                  prefixElem={<span className="text-grey-dark">NGN</span>}
                  // &#8358;
                />
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
                {giftCard.map((card) => (
                  <Card card={card!} />
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
