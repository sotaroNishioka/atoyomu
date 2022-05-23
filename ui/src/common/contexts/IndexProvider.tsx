import { ReactElement } from 'react'
import AuthProvider from './AuthContext'
import DrawerProvider from './DrawerContext'
import LoadingProvider from './LoadingContext'
import MessageProvider from './MessageContext'

const IndexProvider = ({ children }: { children: ReactElement<any, any> }) => (
  <MessageProvider>
    <LoadingProvider>
      <AuthProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </AuthProvider>
    </LoadingProvider>
  </MessageProvider>
)

export default IndexProvider
