import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { temporarilyRegisterConverter } from '../../../common/firebase/converter'
import { db } from '../../../common/firebase/firebaseApp'
import useLoading from '../../../common/hooks/useLoading'
import useMessage from '../../../common/hooks/useMessage'
import { isValidEmail, isValidPassword } from '../../../common/util/validator'
import {
  EMAIL_ALREADY_IN_USE,
  EXPIRED_TEMPORALY_REGISTER,
  INVALID_TEMPORALY_REGISTER,
  REGISTER_UNEXPECTED_ERROR
} from '../../../common/static/messages'

const useRegisterForm = () => {
  const auth = getAuth()
  const router = useRouter()
  const message = useMessage()
  const loading = useLoading()

  const [registerId, setRegisterId] = useState('')
  const [email, setEmail] = useState<string>('')
  const [password1, setPassword1] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [isValidInput, setIsValidInput] = useState<boolean>(false)

  const getEmailByRegisterId = async (
    id: string | undefined | string[]
  ): Promise<void> => {
    if (typeof id !== 'string') {
      message.showMessage(INVALID_TEMPORALY_REGISTER)
      return
    }
    const registerDetail = await (
      await getDoc(
        doc(db, 'temporarilyRegister', id).withConverter(
          temporarilyRegisterConverter
        )
      )
    ).data()
    if (registerDetail === undefined || registerDetail.isEnabled === false) {
      message.showMessage(INVALID_TEMPORALY_REGISTER)
      return
    }
    if (registerDetail.expiredAt < new Date()) {
      message.showMessage(EXPIRED_TEMPORALY_REGISTER)
      return
    }
    setEmail(registerDetail.email)
  }

  const signUpWithEmail = async () => {
    try {
      loading.startLoading()
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      )
      await Promise.all([
        setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          isEmailUser: true,
          lastLoginedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        }),
        setDoc(
          doc(db, 'temporarilyRegister', registerId).withConverter(
            temporarilyRegisterConverter
          ),
          { isEnabled: false },
          { merge: true }
        )
      ])
      await router.push('/home')
    } catch (error: any) {
      const errorCode = error.code
      if (errorCode === 'auth/email-already-in-use') {
        message.showMessage(EMAIL_ALREADY_IN_USE)
        return
      }
      message.showMessage(REGISTER_UNEXPECTED_ERROR)
    } finally {
      loading.finishLoading()
    }
  }

  // next-routerが準備可能な場合にURLQueryからメールアドレスを取得する
  useEffect(() => {
    const f = async () => {
      if (router.isReady) {
        try {
          if (typeof router.query.id === 'string') {
            await getEmailByRegisterId(router.query.id)
            setRegisterId(router.query.id)
            return
          }
          throw new Error()
        } catch (e) {
          message.showMessage(INVALID_TEMPORALY_REGISTER)
        }
      }
    }
    f()
  }, [router.isReady])

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (auth.currentUser !== null) {
      router.push('/home')
    }
  }, [auth.currentUser])

  // 入力内容がすべて正しい場合は決定ボタンを押下可能にする
  useEffect(() => {
    setIsValidInput(
      isValidEmail(email) &&
        isValidPassword(password1) &&
        password1 === password2
    )
  }, [password1, password2, email])

  return {
    email,
    password1,
    password2,
    isValidInput,
    setPassword1,
    setPassword2,
    getEmailByRegisterId,
    signUpWithEmail
  }
}

export default useRegisterForm
