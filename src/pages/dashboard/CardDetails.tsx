import React from "react"
import { DashboardWrapper } from "../../components"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../../components"
import logo from "../../assets/logo3.svg"

export const CardDetails: React.FC<{}> = () => {
  const location = useLocation()
  const { card_detail } = location.state as any
  //   this is just to get the amount, convert to integer and substract a certern amount, to get card balance
  const card_amt = card_detail.amount
  const amount_str = card_amt.replace(",", "")
  const new_amt = parseInt(amount_str) - 5400
  const cardBalance = new_amt

  // Use the card ID to get the card operations, use fetch api in this case
  const cardOperations = [
    {
      cardId: card_detail.id,
      operation_type: "Activation",
      operation_amount: card_detail.amount,
      status: "success",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "January 13th, 2022",
    },
    {
      cardId: card_detail.id,
      operation_type: "Debit",
      operation_amount: "1200",
      status: "failed",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "January 13th, 2022",
    },
    {
      cardId: card_detail.id,
      operation_type: "Debit",
      operation_amount: "1200",
      status: "success",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "January 13th, 2022",
    },
    {
      cardId: card_detail.id,
      operation_type: "Debit",
      operation_amount: "1200",
      status: "success",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      date: "January 13th, 2022",
    },
  ]
  console.log(card_detail)
  return (
    <DashboardWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="flex justify-center ... items-center ... h-96 ... pb-8 pt-8">
          <br />
          <div className="container">
            <div className="block m-auto bg-primary-dark lg:w-120 w-150 h-52 ... md:h-64 ... lg:h-64 ... lg:w-2/3 ... md:w-2/3 ... p-5 rounded-lg shadow-md hover:bg-gray-100">
              <p className="text-white float-right ... md:text-base sticky top-0 ... sm:text-[8px] xs:text-[8px] lg:text-base">
                &#8358;{card_detail.amount}
              </p>
              <br />
              <br />
              <br />
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="lg:w-40 w-32"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
              <div className="flex justify-center ... items-center ... pt-8">
                <h1 className="text-lg font-semibold">Card Balance: &#8358;{cardBalance}</h1>
              </div>
              <div className="flex justify-center ... items-center ... pt-8">
                <Link
                  to="/register"
                  className="p-3 px-6 text-center rounded-md hover:opacity-90 bg-danger text-white"
                >
                  Destroy Card
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-100 ">
          <h1 className="gap-1 text-lg font-semibold text-gray-900">Card Operations:</h1>
          <br />
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {cardOperations.map((cardOperation) => {
              return (
                <li className="mb-10 ml-6">
                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {cardOperation.operation_type}{" "}
                    <span
                      className={`${
                        cardOperation.status == "success" ? `bg-success-light` : `bg-danger-light`
                      }  text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3`}
                    >
                      {cardOperation.status}
                    </span>
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    date: {cardOperation.date}
                  </time>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    amount: {cardOperation.operation_amount}
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Description: {cardOperation.description}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </DashboardWrapper>
  )
}

// import React from "react"
// import { DashboardWrapper } from "../../components"

// export const Dashboard: React.FC<{}> = () => {
//   return (
//     <DashboardWrapper>
//       <div className="">Dashboard</div>
//     </DashboardWrapper>
//   )
// }
