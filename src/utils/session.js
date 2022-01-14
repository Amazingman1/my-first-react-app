const tokenAdmin = 'adminToken'

export function setToken(params) {
  sessionStorage.setItem(tokenAdmin, params)
}
export function getToken(params) {
  return sessionStorage.getItem(tokenAdmin)
  
}