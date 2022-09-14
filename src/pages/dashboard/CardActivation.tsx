import React, { useState } from "react"
import { Button, DashboardWrapper, QRScanner } from "../../components"
import { useCardStore, useStatusStore } from "../../stores"

export const CardActivation: React.FC<{}> = () => {
  const { loading, toast, isLoading } = useStatusStore()
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const { activateCard } = useCardStore()

  const startScanner = () => {
    setIsScanning(true)
  }

  const onQrScanned = async (data: string) => {
    try {
      loading(true, "Activating card...", "border-secondary", "bg-primary-dark")
      const resp = await activateCard(data)
      loading(false)
      if (resp.status === true) {
        toast.success(resp.message)
      } else {
        toast.error(resp.message)
      }
    } catch (error: any) {
      loading(false)
      toast.error(error.message)
    }
  }

  return (
    <DashboardWrapper>
      <div className="h-full w-full md:w-8/12 lg:w-5/12 mx-auto">
        <div className="md:mt-14 mt-5 flex flex-col gap-4 justify-start">
          <h3 className="text-3xl font-medium">Activate Card</h3>

          <div className="flex flex-col gap-6">
            <p className="flex flex-col gap-1.5">
              <p>
                When you create these gift-cards, you can sell them in your stores or on your
                website.
              </p>
              <p>
                Our cards are inactive by default. This was done to prevent them from being used if
                they were not bought directly from you.
              </p>
              <p>Only you or your staff has the privilege to activate these cards.</p>
              <p>This page shows you how the activation is done seamlessly.</p>
              <p>
                When a customer buys the card, the cashier activates the card for them before they
                can go on to use the card for payments.
              </p>
              <p>To begin, click the Scan QR Code.</p>
              <p>Open the card you want to scan on a separate device and show it to the camera.</p>
              <p>
                If you are using this demo on a Desktop or Laptop computer, it would use your front
                camera or webcam.
              </p>
              <p>
                If you are using this demo on a Tablet or Mobile phone, it would use your back
                camera. You can also switch to your front camera with the toggle button.
              </p>
              <p>
                Once the scan finds a QR code, the card activation process starts automatically.
              </p>
              <p>
                Once the card activation is successful, the card is made active and can be used for
                payments.
              </p>
            </p>

            {isScanning === true && (
              <QRScanner
                onSuccess={(data) => onQrScanned(data)}
                onCancel={() => setIsScanning(false)}
              />
            )}

            <Button
              title="Scan QR Code"
              disabled={isLoading}
              type="button"
              onClick={() => startScanner()}
              className="mt-4 bg-primary text-primary-light"
            >
              Scan QR Code
            </Button>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}
