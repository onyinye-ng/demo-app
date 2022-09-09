import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { appId } from "../utils"

export interface Card {
  id: string
  email: string
  telephone: string
  role: "user" | "admin"
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
        createCard: async (credentials) => {},
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
