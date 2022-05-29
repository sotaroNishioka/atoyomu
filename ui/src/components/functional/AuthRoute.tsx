import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Router, { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

const AuthRoute = ({
  children,
  route
}: {
  children: ReactElement<any, any>
  route?: string
}) => {
  // init
  const auth = getAuth()
  const router = useRouter()
  // state
  const [isRedirect, setIsRedirect] = useState<boolean>(false)

  // effect
  useEffect(() => {
    if (isRedirect && router.isReady) {
      Router.replace(route === undefined ? '/' : route)
    }
  }, [isRedirect, router.isReady])

  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      setIsRedirect(true)
    }
  })

  return children
}

export default AuthRoute
