import savecookie from 'react-cookies'

const token = 'adminToken'
const username = 'username'
export function setToken(params) {
  savecookie.save(token, params)
}
export function getToken(params) {
  return savecookie.load(token)
}
export function setUsername(params) {
  savecookie.save(username, params)
}
export function getUsername(params) {
  return savecookie.load(username)
}