import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import axios from "axios"
import { apiDomain, appId } from "../utils"

export interface User {
  id: string
  email: string
  telephone: string
  role: "user" | "admin"
  created: string
}
export interface Business {}
export type RegisterCredentials = {
  businessName: string
  email: string
  telephone: string
  subscribe: boolean
}
export type LoginCredentials = {
  email: string
  telephone: string
}

interface AccountState {
  authenticated: boolean
  authToken?: string
  user?: User
  business?: Business
}

interface AccountMethods {
  restoreDefault: () => void
  registerBusiness: (credentials: RegisterCredentials) => Promise<any>
  login: (credentials: { email: string; telephone: string }) => Promise<any>
  logout: () => void
}

export const useAccountStore = create<AccountState & AccountMethods>()(
  devtools(
    persist(
      (set, get) => ({
        authenticated: false,
        authToken: undefined,
        user: undefined,
        business: undefined,
        restoreDefault: () => {
          set({
            authenticated: false,
            authToken: undefined,
            user: undefined,
          })
        },
        registerBusiness: async (credentials) => {
          return axios.post(`${apiDomain}/account/register`, credentials)
        },
        login: async (credentials) => {},
        logout: () => {},
      }),
      {
        name: `${appId}.account`,
      }
    )
  )
)
