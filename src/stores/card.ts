import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { appId, authToken, request } from "../utils"

export interface Card {
  id: string
  business: string
  amount: number
  balance: number
  couponCode: string
  status: "active" | "inactive" | "used" | "destroyed"
  created: string
}
export type ActivateCardCredentials = {
  qrCodeValue: string
}
export type CardPaymentCredentials = {
  amount: number
  qrCodeValue?: string
  couponCode?: string
}

interface CardState {
  cards: Card[]
}

interface CardMethods {
  restoreDefault: () => void
  createCard: (credentials: Partial<Card>) => Promise<any>
  getCards: () => Promise<any>
  activateCard: (qrCodeValue: ActivateCardCredentials["qrCodeValue"]) => Promise<any>
  cardPayment: (credentials: CardPaymentCredentials) => Promise<any>
}

export const useCardStore = create<CardState & CardMethods>()(
  devtools(
    persist(
      (set, get) => ({
        cards: [],
        restoreDefault: () => {
          set({
            cards: [],
          })
        },
        createCard: async (credentials) => {
          try {
            return await request
              .post({
                url: "/cards",
                body: credentials,
                headers: {
                  ...authToken(),
                },
              })
              .then((resp) => {
                if (resp.status === true) {
                  const cards = get().cards
                  set({
                    cards: [resp.data.card, ...cards],
                  })
                }
                return resp
              })
          } catch (error) {
            throw error
          }
        },
        getCards: async () => {},
        activateCard: async (credentials) => {},
        cardPayment: async (credentials) => {},
      }),
      {
        name: `${appId}.card`,
      }
    )
  )
)
