import React from "react"
import { DashboardWrapper } from "../../components"

export const CardActivation: React.FC<{}> = () => {
  return (
    <DashboardWrapper>
      <div className="h-full flex items-center justify-center">
        <div className="w-64 md:w-8/12 lg:w-6/12 flex flex-col gap-8 ">
          <div className="flex">
            <h2 className=" text-center text-2xl font-semibold"> Card Activation </h2>
          </div>
          <div className="">
            <div>
              <p className="inline-block">
                Inorder to activate a card you would have to open this page on your mobile device to
                continue. Once you've clicked the button scan the qrcode behind your gift card and
                click on the activate button. once card activation is successful you can begin
                spending with your card
              </p>
            </div>
            <div className=" text-center mt-10 border rounded-md p-2 bg-primary-dark text-primary-light">
              <button type="submit">Activate</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}
