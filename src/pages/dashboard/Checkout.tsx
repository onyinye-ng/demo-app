import React from "react"
import { DashboardWrapper } from "../../components"

export const Checkout: React.FC<{}> = () => {
  return (
    <DashboardWrapper>
      {/* <div className="h-full flex justify-center items-center">
            <div className="w-80 md:w-[28rem] flex flex-col gap-6 border rounded-sm p-4">
                <div>
                    <h1 className="text-center text-2xl"> Checkout </h1>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <div className="pb-2">
                            <label htmlFor="amount" className="">Amount </label>
                        </div>
                        <div>
                            <input type="text" name="amount" placeholder="Amount" className="p-2 border rounded-md w-full"/>
                        </div>
                    </div>
                    <div className="text-center border rounded-md bg-primary-dark text-primary-light">
                        <button type="submit" className="p-2">Submit</button>
                    </div>
                </div>
            </div>
        </div> */}
      <div className="h-full flex items-center justify-center">
        <div className="w-64 md:w-8/12 lg:w-6/12 flex flex-col gap-8 ">
          <div className="flex">
            <h2 className=" text-center text-2xl font-semibold"> Checkout </h2>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="inline-block">
                Inorder to activate a card you would have to open this page on your mobile device to
                continue. Once you've clicked the button scan the qrcode behind your gift card and
                click on the activate button. once card activation is successful you can begin
                spending with your card
              </p>
            </div>
            <form className="flex flex-col gap-8">
              <div className="">
                <div className="pb-2">
                  <label
                    htmlFor="amount"
                    className=""
                  >
                    Amount{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    className="p-2 border rounded-md w-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex gap-5 mb-3">
                  <input
                    type="checkbox"
                    name="couponcode"
                  />
                  <label htmlFor="couponcode">Pay with coupon</label>
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="code">Coupon Code</label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Enter gift code"
                    className="p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="text-center border rounded-md bg-primary-dark text-primary-light">
                <button
                  type="submit"
                  className="p-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="w-80 md:w-[28rem] flex flex-col gap-6 border rounded-sm p-4">
                <div>
                    <h1 className="text-center text-2xl"> Checkout </h1>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <div className="pb-2">
                            <label htmlFor="amount" className="">Amount </label>
                        </div>
                        <div>
                            <input type="text" name="amount" placeholder="Amount" className="p-2 border rounded-md w-full"/>
                        </div>
                    </div>
                    <div className="text-center border rounded-md bg-primary-dark text-primary-light">
                        <button type="submit" className="p-2">Submit</button>
                    </div>
                </div>
            </div> */}
      </div>
    </DashboardWrapper>
  )
}
