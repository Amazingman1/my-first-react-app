import savecookie from 'react-cookies'

const token = 'adminToken'
export function setToken(params) {
  savecookie.save(token, params)
}
export function getToken(params) {
  return savecookie.load(token)
}
export function setUsername(params) {
  savecookie.save('username', params)
}