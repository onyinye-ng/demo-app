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
            business: undefined,
          })
        },
        registerBusiness: async (credentials) => {
          try {
            return await axios.post(`${apiDomain}/account/register`, credentials).then((res) => {
              set({
                authenticated: true,
                authToken: res.data.data.authToken,
                user: res.data.data.user,
                business: res.data.data.business,
              })
              return res.data
            })
          } catch (error: any) {
            console.log(error.response.data)
            return error.response.data
          }
        },
        login: async (credentials) => {
          try {
            return await axios.post(`${apiDomain}/account/login`, credentials).then((res) => {
              set({
                authenticated: true,
                authToken: res.data.data.authToken,
                user: res.data.data.user,
                business: res.data.data.business,
              })
              return res.data
            })
          } catch (error: any) {
            console.log(error.response.data)
            return error.response.data
          }
        },
        logout: () => {
          get().restoreDefault()
        },
      }),
      {
        name: `${appId}.account`,
      }
    )
  )
)
