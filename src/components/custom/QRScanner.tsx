import { ArrowPathIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import React, { useRef, useState } from "react"
import { QrReader } from "react-qr-reader"
import { useStatusStore } from "../../stores"
import { IconButton } from "../forms/FormButtons"

const viewFinder: React.FC<{}> = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-40 h-40 border border-separate z-20 border-secondary flex justify-center items-center">
        <PlusIcon className="w-10 text-secondary" />
      </div>
    </div>
  )
}

type Props = {
  children?: any
  onSuccess: (data: string) => any
  onCancel: () => void
}

export const QRScanner: React.FC<Props> = (props) => {
  const [useFrontCamera, setUseFrontCamera] = useState<boolean>(false)
  const { toast } = useStatusStore()
  const lastResult = useRef<string>("")

  return (
    <div className="absolute h-screen w-screen top-0 left-0 z-10 bg-black">
      <div className="h-64 w-screen absolute top-0 flex gap-10 justify-center items-center">
        <span className="text-grey-light font-medium text-lg">Find a QR code</span>
      </div>

      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            if (lastResult.current === result.toString()) return
            lastResult.current = result.toString()

            window.navigator.mediaDevices
              .getUserMedia({ video: true, audio: false })
              .then((mediaStream) => {
                const stream = mediaStream
                console.log(stream.getTracks())
                stream.getTracks().forEach((track) => stream.removeTrack(track))
              })

            props.onCancel()
            toast.success("Scanned!", 1)
            props.onSuccess(result?.toString())
          }
        }}
        constraints={{ facingMode: useFrontCamera === true ? "user" : "environment" }}
        className="p-0 h-screen flex items-center"
        videoContainerStyle={{
          width: "100%",
          height: "100vh",
          paddingTop: "0%",
          overflow: "hidden",
          position: "relative",
        }}
        ViewFinder={viewFinder}
      />

      <div className="h-64 w-screen absolute bottom-0 flex gap-10 justify-center items-center">
        <IconButton
          type="button"
          title="toggle-mode"
          className="w-fit block text-grey-light hover:bg-grey-dark"
          onClick={() => props.onCancel()}
        >
          <XMarkIcon className="w-8 h-8" />
        </IconButton>
        <IconButton
          type="button"
          title="toggle-mode"
          className="w-fit block text-grey-light hover:bg-grey-dark active:rotate-90 ease-in-out"
          onClick={() => setUseFrontCamera(!useFrontCamera)}
        >
          <ArrowPathIcon className="w-8 h-8" />
        </IconButton>
      </div>
    </div>
  )
}
