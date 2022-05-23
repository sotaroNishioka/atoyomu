import {
  deleteUser,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { db } from '../../../common/firebase/firebaseApp'
import useLoading from '../../../common/hooks/useLoading'
import useMessage from '../../../common/hooks/useMessage'
import { isValidEmail, isValidPassword } from '../../../common/util/validator'
import {
  INVALID_LOGIN_DATA,
  USER_IS_NOT_EXIST
} from '../../../common/static/messages'

const useLoginForm = () => {
  // hooks
  const auth = getAuth()
  const loading = useLoading()
  const message = useMessage()
  const router = useRouter()
  // state
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const isValidInput = (): boolean => {
    let error = false
    setEmailError('')
    setPasswordError('')
    if (isValidEmail(email) === false) {
      setEmailError('メールアドレスの形式が正しくありません。')
      error = true
    }
    if (email === '') {
      setEmailError('メールアドレスを入力してください。')
      error = true
    }
    if (isValidPassword(password) === false) {
      setPasswordError(
        'パスワードには英小文字、大文字、数字、記号のうち3種類以上使用してください。'
      )
      error = true
    }
    if (password.length > 0 && (password.length < 8 || password.length > 16)) {
      setPasswordError('パスワードの長さは8-16文字です。')
      error = true
    }
    if (password === '') {
      setPasswordError('パスワードを入力してください。')
      error = true
    }
    if (error) {
      return false
    }
    return true
  }

  const loginWithEmail = async (): Promise<void> => {
    loading.startLoading()
    if (isValidInput() === false) {
      loading.finishLoading()
      return
    }
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      await updateDoc(doc(db, 'users', user.uid), {
        lastLoginedAt: serverTimestamp()
      })
      await router.push('/home')
    } catch (e) {
      message.showMessage(INVALID_LOGIN_DATA)
    } finally {
      loading.finishLoading()
    }
  }

  const loginWithGoogle = async (): Promise<void> => {
    loading.startLoading()
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const additionalInfo = getAdditionalUserInfo(result)
      if (additionalInfo === null) {
        throw new Error('cannot_get_info')
      }
      const { isNewUser } = additionalInfo
      if (isNewUser === true) {
        if (auth.currentUser !== null) {
          await deleteUser(auth.currentUser)
        }
        throw new Error('is_not_existing_user')
      }
      const { user } = result
      await updateDoc(doc(db, 'users', user.uid), {
        lastLoginedAt: serverTimestamp()
      })
      await router.push('/home')
    } catch (e: any) {
      if (e.message === 'cannot_get_info') {
        message.showMessage(INVALID_LOGIN_DATA)
        return
      }
      if (e.message === 'is_not_existing_user') {
        message.showMessage(USER_IS_NOT_EXIST)
        return
      }
      message.showMessage(INVALID_LOGIN_DATA)
    } finally {
      loading.finishLoading()
    }
  }

  return {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    loginWithEmail,
    loginWithGoogle
  }
}

export default useLoginForm
