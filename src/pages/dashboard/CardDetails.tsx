import {
  ArrowLeftIcon,
  BoltIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import { QRCodeCanvas } from "qrcode.react"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, DashboardWrapper, IconButton } from "../../components"
import { LoadingIndicator } from "../../components/layouts/StatusBar"
import { Card as CardType, useCardStore, useStatusStore } from "../../stores"
import { copyToClipboard, formatDate, formatTime, once } from "../../utils"

export const CardDetails: React.FC<{}> = () => {
  const { getCard, destroyCard } = useCardStore()
  const { id } = useParams<{ id: string }>()
  const [card, setCard] = useState<CardType>()
  const [operations, setOperations] = useState<any[]>()
  const { toast, loading, confirm, isLoading, closeConfirm } = useStatusStore()
  const navigate = useNavigate()
  const [fetching, setFetching] = useState<boolean>(true)

  const fetchCard = useCallback(async () => {
    try {
      loading(true, "Getting card...")
      const resp = await getCard(id!)
      loading(false)
      setFetching(false)

      if (resp.status === true) {
        setCard(resp.data.card)
        setOperations(resp.data.operations)
      } else {
        navigate(-1)
        toast.error("Card not found.")
      }
    } catch (error: any) {
      setFetching(false)
      loading(false)
      toast.error(error.message)
    }
  }, [getCard, id, loading, navigate, toast])

  useEffect(() => {
    return once(() => {
      fetchCard()
    })
  }, [fetchCard, loading])

  const handleCardDestroy = () => {
    confirm.error(
      <div>
        Are you sure you want to destroy this card?
        <br />
        Note that this action is irreversible!
      </div>,
      "Destroy",
      async () => {
        try {
          loading(true, "Destroying card...", "border-secondary", "bg-primary")
          const resp = await destroyCard(id!)
          loading(false)

          if (resp.status === true) {
            toast.success(resp.message)
            await fetchCard()
          } else toast.error(resp.message)

          closeConfirm()
        } catch (error: any) {
          loading(false)
          toast.error(error.message)
          closeConfirm()
        }
      }
    )
  }

  return (
    <DashboardWrapper>
      <div className="h-full w-full md:w-8/12 lg:w-6/12 mx-auto">
        <div className="md:mt-14 mt-5 flex flex-col gap-4 justify-start">
          <h3 className="text-3xl font-medium flex justify-between">
            <span>Card details</span>
            <IconButton
              title="back"
              className="bg-grey-light"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className="w-5" />
            </IconButton>
          </h3>

          {fetching === true ? (
            <LoadingIndicator borderColor="border-primary" />
          ) : (
            <div className="mt-8 w-full flex flex-col md:flex-row gap-8 justify-between">
              <div className="w-full md:w-fit flex flex-col gap-4 bg-se condary">
                <Card card={card!} />

                <div className="w-full flex gap-6">
                  <div className="bg-white rounded-md w-max p-2 max-h-fit">
                    <QRCodeCanvas
                      value={card?.id!}
                      fgColor={"#273444"}
                      size={160}
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full justify-around items-end">
                    <span className="flex flex-col items-end">
                      <b>Amount</b>
                      <span>&#8358; {card?.amount!}</span>
                    </span>
                    <span className="flex flex-col items-end">
                      <b>Balance</b>
                      <span>&#8358; {card?.balance!}</span>
                    </span>
                    <span className="flex flex-col items-end">
                      <b>Created</b>
                      <span className="text-end">
                        {formatDate(card?.created!)}
                        <br />
                        {formatTime(card?.created!)}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  <span>COUPON CODE</span>
                  <div className="w-full flex justify-between items-start">
                    <code className="w-full text-4xl">{card?.couponCode}</code>
                    <IconButton
                      title="copy"
                      onClick={() => copyToClipboard(card?.couponCode!)}
                      className="bg-grey-light text-grey"
                    >
                      <DocumentDuplicateIcon className="w-4" />
                    </IconButton>
                  </div>
                </div>

                <div className="w-full flex justify-between">
                  <span>Status</span>
                  <span
                    className={`w-fit p-1 px-3 rounded-full text-sm ${
                      card?.status === "inactive" && "bg-grey-light text-grey-dark"
                    } ${card?.status === "active" && "bg-success-light text-success"} ${
                      card?.status === "used" && "bg-warning-light text-warning"
                    } ${card?.status === "destroyed" && "bg-danger-light text-danger"}`}
                  >
                    {card?.status}
                  </span>
                </div>

                {["active", "inactive"].includes(card?.status!) === true && (
                  <Button
                    title="destroy"
                    onClick={handleCardDestroy}
                    disabled={isLoading}
                    className="w-full mt-5 bg-danger text-danger-light flex justify-center items-center gap-3"
                  >
                    <span>Destroy card</span>
                    <ExclamationTriangleIcon className="w-6" />
                  </Button>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <h5 className="text-2xl font-medium text-end mb-5">Card Operations</h5>

                <div className="w-full md:h-[500px] overflow-y-auto px-2 flex flex-col gap-3">
                  {operations?.map((operation: any, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-between items-start"
                    >
                      <div className="flex gap-3 items-center">
                        {operation.operations === "created" && (
                          <SparklesIcon className="w-4 text-grey" />
                        )}
                        {operation.operations === "activated" && (
                          <SparklesIcon className="w-4 text-secondary" />
                        )}
                        {operation.operations === "payment" && (
                          <BoltIcon className="w-4 text-success" />
                        )}
                        {operation.operations === "destroyed" && (
                          <TrashIcon className="w-4 text-danger" />
                        )}
                        <span className="font-medium">Card {operation?.operations}</span>
                      </div>
                      <span className="text-end">
                        {formatDate(card?.created!)}
                        <br />
                        {formatTime(card?.created!)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardWrapper>
  )
}
