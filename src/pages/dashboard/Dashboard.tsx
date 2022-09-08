import React from "react"
import { DashboardWrapper } from "../../components"
import { Link } from "react-router-dom"
import { Button } from "../../components/forms"
import logo from "../../assets/logo3.svg"

export const Dashboard: React.FC<{}> = () => {
  const giftCard = [
    {
      amount: "10,000",
      id: 1,
    },
    {
      amount: "20,000",
      id: 2,
    },
    {
      amount: "30,000",
      id: 3,
    },
    {
      amount: "40,000",
      id: 4,
    },
    {
      amount: "50,000",
      id: 5,
    },
  ]

  return (
    <DashboardWrapper>
      <div className=" flex items-center justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-1">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create a Gift Card
            </h2>
            <br />
          </div>
          <div className="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
            <form
              className="space-y-4"
              method="POST"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">&#8358;</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label className="sr-only">Currency</label>
                    <span className="text-gray-500 sm:text-sm pr-2">NGN </span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  title="create card"
                  type="submit"
                  className="bg-primary-dark group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <div className="divide-y divide-slate-400/25 opacity-10">
        <div></div>
        <div></div>
      </div>
      <div>
        <br />
        <div className="grid grid-cols-4 gap-4 ...">
          {giftCard.map((card) => {
            return (
              <Link
                key={card.id}
                to="."
                className="block bg-primary-dark lg:w-120 w-150 lg:h-48 ...  p-5 max-w-sm rounded-lg shadow-md hover:bg-gray-100"
              >
                <p className="text-white float-right ... md:text-base sticky top-0 ... sm:text-[8px] xs:text-[8px] lg:text-base">
                  &#8358;{card.amount}
                </p>
                <br />
                <br />
                <div className="flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="lg:w-40 w-32"
                  />
                </div>
              </Link>
            )
          })}
        </div>
        <br />
      </div>
      <div className="divide-y divide-slate-400/25 opacity-10">
        <div></div>
        <div></div>
      </div>
      <br />
      {/* Pagination */}
      <div className=" flex items-center justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8 drop-shadow-lg">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="."
                className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border-inherit  border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="."
                className="py-2 px-3 leading-tight text-gray-500 bg-white border-inherit border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="."
                className="py-2 px-3 leading-tight text-gray-500 bg-white border-inherit border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="."
                aria-current="page"
                className="py-2 px-3 text-blue-600 bg-blue-50 border-inherit border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="."
                className="py-2 px-3 leading-tight text-gray-500 bg-white border-inherit border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="."
                className="py-2 px-3 leading-tight text-gray-500 bg-white border-inherit border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="."
                className="py-2 px-3 leading-tight text-gray-500 bg-white border-inherit rounded-r-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <br />
    </DashboardWrapper>
  )
}
