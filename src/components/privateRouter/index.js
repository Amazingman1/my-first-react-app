import React from 'react'

import { Route, Redirect } from 'react-router-dom'

import { getToken } from '@/utils/session'

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={routerProps => (
      getToken() ? <Component {...routerProps} /> : <Redirect to='/' />
    )} />
  )
}
export default PrivateRouter