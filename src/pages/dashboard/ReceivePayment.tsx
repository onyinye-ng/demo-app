import React, { FormEvent, useState } from "react"
import {
  Button,
  CheckboxInput,
  DashboardWrapper,
  Input,
  Label,
  PrefixInput,
  QRScanner,
} from "../../components"
import { useAccountStore, useCardStore, useStatusStore } from "../../stores"
import { formatDate, formatTime } from "../../utils"

export const ReceivePayment: React.FC<{}> = () => {
  const [payWithCoupon, setPayWithCoupon] = useState<boolean>()
  const { loading, toast, confirm } = useStatusStore()
  const { business } = useAccountStore()
  const [credentials, setCredentials] = useState({
    amount: 0,
    couponCode: "",
    qrCode: "",
  })
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const { cardPayment } = useCardStore()

  const handleChange = (field: string, value: string | boolean) => {
    setCredentials({
      ...credentials,
      [field]: value,
    })
  }

  const PaymentReceipt: React.FC<{ details: any }> = ({ details }) => {
    return (
      <div className="w-full">
        <h4 className="text-xl font-semibold text-center">Payment Receipt</h4>
        <div className="mt-5 flex text-sm flex-col gap-3">
          <div className="w-full flex justify-between">
            <span>Business</span>
            <span className="text-ellipsis">{business?.businessName}</span>
          </div>
          <div className="w-full flex justify-between">
            <span>Amount</span>
            <span>{details.amount}</span>
          </div>
          <div className="w-full flex justify-between">
            <span>Balance</span>
            <span>{details.balance}</span>
          </div>
          <div className="w-full flex justify-between">
            <span>Date</span>
            <span className="text-right">
              {formatDate(details.timestamp!)}
              <br />
              {formatTime(details.timestamp!)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault()

    try {
      loading(true, "Making payment...", "border-secondary", "bg-primary-dark")
      const resp = await cardPayment(credentials)
      loading(false)
      if (resp.status === true) {
        toast.success(resp.message)
        confirm.success(<PaymentReceipt details={resp.data.details} />, "Done")
      } else {
        toast.error(resp.message)
      }
    } catch (error: any) {
      loading(false)
      toast.error(error.message)
    }
  }

  const onQrScanned = async (data: string) => {
    const creds = { ...credentials, couponCode: "", qrCode: data }

    try {
      loading(true, "Making payment...", "border-secondary", "bg-primary-dark")
      const resp = await cardPayment(creds)
      loading(false)
      if (resp.status === true) {
        toast.success(resp.message)
        confirm.success(<PaymentReceipt details={resp.data.details} />, "Done")
      } else {
        toast.error(resp.message)
      }
    } catch (error: any) {
      loading(false)
      toast.error(error.message)
    }
  }

  const startScanner = () => {
    if (credentials.amount === 0) {
      toast.error("Please enter amount!", 2)
      return
    }
    setIsScanning(true)
  }

  return (
    <DashboardWrapper>
      <div className="h-full w-full md:w-8/12 lg:w-5/12 mx-auto">
        <div className="md:mt-14 mt-5 flex flex-col gap-4 justify-start">
          <h3 className="text-3xl font-medium">Receive Payment</h3>

          <div className="flex flex-col gap-6">
            <p className="inline-block">
              Inorder to activate a card you would have to open this page on your mobile device to
              continue. Once you've clicked the button scan the qrcode behind your gift card and
              click on the activate button. once card activation is successful you can begin
              spending with your card
            </p>

            <form
              id="paymentForm"
              onSubmit={handlePayment}
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
                  affix={<span className="text-grey-dark">NGN</span>}
                />
              </div>

              <div className="my-2 w-full flex gap-2 items-center">
                <CheckboxInput
                  type="checkbox"
                  defaultChecked={payWithCoupon}
                  id="payWithCouponCode"
                  onChange={(e) => setPayWithCoupon(!payWithCoupon)}
                />
                <Label
                  htmlFor="payWithCouponCode"
                  className="m-0"
                >
                  Pay with coupon code
                </Label>
              </div>

              {payWithCoupon === true && (
                <div className="w-full flex flex-col gap-1">
                  <Label htmlFor="couponCode">Coupon Code</Label>
                  <Input
                    id="couponCode"
                    minLength={12}
                    maxLength={12}
                    defaultValue={credentials.couponCode}
                    onChange={(e) => handleChange("couponCode", e.target.value)}
                    className="border border-grey-light"
                    required
                    placeholder="ex. 1234567890EA"
                  />
                </div>
              )}

              {isScanning === true && (
                <QRScanner
                  onSuccess={(data) => onQrScanned(data)}
                  onCancel={() => setIsScanning(false)}
                />
              )}

              {payWithCoupon === true ? (
                <Button
                  title="Receive payment"
                  type="submit"
                  className="mt-4 bg-primary text-primary-light"
                >
                  Receive Payment
                </Button>
              ) : (
                <Button
                  title="Scan QR Code"
                  type="button"
                  onClick={() => startScanner()}
                  className="mt-4 bg-primary text-primary-light"
                >
                  Scan QR Code
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}
