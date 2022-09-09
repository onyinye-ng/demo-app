// constants
export const appId = process.env.REACT_APP_APP_ID
export const domain = process.env.REACT_APP_DOMAIN
export const apiDomain = process.env.REACT_APP_API_DOMAIN

export const authToken = () => ({
  Authorization:
    "Bearer " + JSON.parse(localStorage.getItem(appId + ".account") ?? "{}")?.state?.authToken ??
    "",
})
