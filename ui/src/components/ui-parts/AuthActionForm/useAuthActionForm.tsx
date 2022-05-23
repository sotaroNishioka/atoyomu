import { applyActionCode, confirmPasswordReset, getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useMessage from '../../../common/hooks/useMessage'
import { isValidPassword } from '../../../common/util/validator'
import { RESET_PASSWORD_INVALID_URL } from '../../../common/static/messages'

const useAuthActionForm = () => {
  const auth = getAuth()
  const router = useRouter()
  const message = useMessage()
  const { mode, oobCode } = router.query

  const [password1, setPassword1] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [isValidQuery, setIsValidQuery] = useState<boolean>(false)
  const [isValidInput, setIsValidInput] = useState<boolean>(false)

  useEffect(() => {
    if (router.isReady === true) {
      if (mode !== 'resetPassword' || typeof oobCode !== 'string') {
        message.showMessage(RESET_PASSWORD_INVALID_URL)
      }
      setIsValidQuery(true)
    }
  }, [mode, oobCode])

  // 入力内容がすべて正しい場合は決定ボタンを押下可能にする
  useEffect(() => {
    if (isValidQuery === true) {
      setIsValidInput(isValidPassword(password1) && password1 === password2)
    }
  }, [password1, password2, isValidQuery])

  const updatePassword = async () => {
    if (isValidInput === false) {
      return
    }
    const code = oobCode as string
    try {
      await confirmPasswordReset(auth, code, password1)
      await applyActionCode(auth, code)
    } catch (e) {
      message.showMessage(RESET_PASSWORD_INVALID_URL)
    }
  }

  return {
    password1,
    password2,
    isValidInput,
    setPassword1,
    setPassword2,
    updatePassword
  }
}

export default useAuthActionForm
