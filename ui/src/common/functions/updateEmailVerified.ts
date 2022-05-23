import { getFunctions, httpsCallable } from 'firebase/functions'
import useMessage from '../hooks/useMessage'
import { UNEXPECTED_ERROR } from '../static/messages'

const updateEmailVerified = async (): Promise<void> => {
  const functions = getFunctions()
  const message = useMessage()

  try {
    await httpsCallable(functions, 'updateEmailVerified')
  } catch (e) {
    message.showMessage(UNEXPECTED_ERROR)
    throw new Error()
  }
}

export default updateEmailVerified
