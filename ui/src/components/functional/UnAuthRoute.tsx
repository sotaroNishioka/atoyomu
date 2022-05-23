import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Router from 'next/router'
import { ReactElement } from 'react'

const UnAuthRoute = ({
  children,
  route
}: {
  children: ReactElement<any, any>
  route?: string
}) => {
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      Router.replace(route === undefined ? '/home' : route)
    }
  })

  return children
}

export default UnAuthRoute
