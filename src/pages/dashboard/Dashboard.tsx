import { PlusIcon } from "@heroicons/react/24/solid"
import React, { useEffect } from "react"
import { DashboardWrapper, LinkButton } from "../../components"
import { useAccountStore, useCardStore } from "../../stores"
import { once } from "../../utils"

export const Dashboard: React.FC<{}> = () => {
  const { cards, getCards } = useCardStore()
  const { business, user } = useAccountStore()

  // get cards
  useEffect(() => {
    return once(() => {
      getCards()
    })
  }, [cards.length, getCards])

  return (
    <DashboardWrapper>
      <div className="h-full w-full md:w-8/12 lg:w-6/12 mx-auto">
        <div className="md:mt-14 mt-5 flex flex-col gap-4 justify-start">
          <h3 className="text-5xl font-medium">{business?.businessName}</h3>
          <small>
            {user?.email}, tel: {user?.telephone}
          </small>

          <hr className="text-grey-light" />

          <div className="flex flex-col md:flex-row gap-3 justify-between">
            <div className="w-full md:w-1/2">
              <div className="h-[180px] min-w-[312px] bg-primary rounded-lg flex justify-center items-center">
                <span className="text-4xl text-ellipsis text-primary-light">
                  {cards.length ?? 0} Cards
                </span>
              </div>

              <LinkButton
                to="/dashboard/cards"
                className="bg-grey w-full md:w-fit text-white mt-5 flex justify-center items-center gap-1"
                title="create card"
              >
                <PlusIcon className="w-5" />
                Create Card
              </LinkButton>
            </div>

            <div className="w-full md:w-1/2 my-16 md:my-0 flex justify-start items-center font-medium flex-col gap-7">
              <div className="w-1/2">
                {cards.filter((card) => card.status === "active").length} active cards
              </div>
              <div className="w-1/2">
                {cards.filter((card) => card.status === "inactive").length} inactive cards
              </div>
              <div className="w-1/2">
                {cards.filter((card) => card.status === "used").length} used-up cards
              </div>
              <div className="w-1/2">
                {cards.filter((card) => card.status === "destroyed").length} destroyed cards
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}
