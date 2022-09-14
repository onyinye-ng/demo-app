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
            <p className="inline-block">
              Inorder to activate a card you would have to open this page on your mobile device to
              continue. Once you've clicked the button scan the qrcode behind your gift card and
              click on the activate button. once card activation is successful you can begin
              spending with your card
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
