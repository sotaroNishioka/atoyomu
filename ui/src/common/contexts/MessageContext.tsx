import React, {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useState
} from 'react'
import Message from '../../components/ui-parts/Message'

type MessageContextType = {
  isShow: boolean
  message: string
  type: 'default' | 'warning' | 'error' | 'success'
  closeMessage: () => void
  showMessage: (arg: { message: string; type: string }) => void
}

export const MessageContext = createContext<MessageContextType>(
  {} as MessageContextType
)

const MessageProvider = ({
  children
}: {
  children: ReactElement<any, any>
}) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<'default' | 'warning' | 'error' | 'success'>(
    'default'
  )
  const closeMessage = useCallback(() => setIsShow(false), [])
  const showMessage = useCallback((arg: { message: string; type: string }) => {
    const { message: messageArg, type: typeArg } = arg
    setMessage(messageArg)
    setType(
      typeArg === undefined ||
        (typeArg !== 'default' &&
          typeArg !== 'error' &&
          typeArg !== 'success' &&
          typeArg !== 'warning')
        ? 'default'
        : typeArg
    )
    setIsShow(true)
  }, [])
  const val = useMemo(
    () => ({ isShow, message, type, closeMessage, showMessage }),
    [isShow]
  )

  return (
    <MessageContext.Provider value={val}>
      {children}
      <Message
        isOpen={isShow}
        message={message}
        type={type}
        onClose={closeMessage}
      />
    </MessageContext.Provider>
  )
}

export default MessageProvider
