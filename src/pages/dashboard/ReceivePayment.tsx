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
            <p className="flex flex-col gap-1.5">
              <p>
                These gift-cards can be gifted or sold to your customers. This acts as an incentive
                to bring them back to your business and also to bring in new customers.
              </p>
              <p>
                When a customer has hold of this card. It's acts a means of payment for products and
                services offered by your business.
              </p>
              <p>Note that only active cards can be used for payments.</p>
              <p>To receive payment from a customer,</p>
              <p>Open a card you want to use for payment on a separate device.</p>
              <p>Enter the amount for the service</p>
              <p>Enter the coupon code on the card and click "Recieve Payment" OR</p>
              <p>Go ahead and scan the QR Code on the card.</p>
              <p>
                If you are using this demo on a Desktop or Laptop computer, it would use your front
                camera or webcam.
              </p>
              <p>
                If you are using this demo on a Tablet or Mobile phone, it would use your back
                camera. You can also switch to your front camera with the toggle button.
              </p>
              <p>Once the scan finds a QR code, the payment process starts automatically.</p>
              <p>
                Once the payment is successful, a demo receipt would be shown which would be made
                available for printing on the live application.
              </p>
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
                  className="mt-4 mb-7 bg-primary text-primary-light"
                >
                  Receive Payment
                </Button>
              ) : (
                <Button
                  title="Scan QR Code"
                  type="button"
                  onClick={() => startScanner()}
                  className="mt-4 mb-7 bg-primary text-primary-light"
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
