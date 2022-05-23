import {
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { temporarilyRegisterConverter } from '../../../common/firebase/converter'
import { db } from '../../../common/firebase/firebaseApp'
import useLoading from '../../../common/hooks/useLoading'
import useMessage from '../../../common/hooks/useMessage'
import { addTime } from '../../../common/util/uuid'
import { isValidEmail } from '../../../common/util/validator'
import { registerMail } from '../../../common/static/mail'
import {
  IS_NOT_NEW_USER,
  SIGNUP_UNEXPEECTED_ERROR
} from '../../../common/static/messages'

const useSignUpForm = () => {
  const auth = getAuth()
  const router = useRouter()
  const loading = useLoading()
  const message = useMessage()

  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')

  const createUsersData = async (user: User) => {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerId: user.providerId,
      providerData: user.providerData,
      lastLoginedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  }

  const getIsEmailUserExsits = async (emailArg: string): Promise<boolean> => {
    const result = await fetchSignInMethodsForEmail(auth, emailArg)
    if (result.length !== 0) {
      return true
    }
    return false
  }

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider())
      const additionalInfo = getAdditionalUserInfo(result)
      if (additionalInfo === null) {
        await auth.signOut()
        throw new Error('cannot_get_info')
      }
      const { isNewUser } = additionalInfo
      if (isNewUser === false) {
        await auth.signOut()
        throw new Error('not_new_user')
      }
      await createUsersData(result.user)
    } catch (e: any) {
      if (e.message === 'not_new_user') {
        message.showMessage(IS_NOT_NEW_USER)
        router.push('/signup')
        return
      }
      message.showMessage(SIGNUP_UNEXPEECTED_ERROR)
    }
  }

  // ユーザー認証が必要なのでペンディング
  const signUpWithTwitter = async (): Promise<void> => {
    // eslint-disable-next-line no-alert
    alert('Twitterログインは実装中')
  }

  const validateEmail = async (): Promise<boolean> => {
    let error = false
    setEmailError('')
    if (isValidEmail(email) === false) {
      setEmailError('メールアドレスの形式が正しくありません。')
      error = true
    }
    if (email === '') {
      setEmailError('メールアドレスを入力してください。')
      error = true
    }
    if (error) {
      return false
    }
    const isEmailExsits = await getIsEmailUserExsits(email)
    if (isEmailExsits === true) {
      setEmailError('このメールアドレスは既に登録されています')
      error = true
    }
    if (error) {
      return false
    }
    return true
  }

  const onSubmitEmailSignup = async () => {
    loading.startLoading()
    if ((await validateEmail()) === false) {
      loading.finishLoading()
      return
    }
    const { id: registerId } = await addDoc(
      collection(db, 'temporarilyRegister').withConverter(
        temporarilyRegisterConverter
      ),
      {
        email,
        isEnabled: true,
        expiredAt: Timestamp.fromDate(addTime({ date: new Date(), hour: 1 })),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    )

    await addDoc(collection(db, 'mail'), {
      to: [email],
      from: `ATOYOMU <noreply@atoyomu.devdev.app>`,
      message: {
        subject: '【ATOYOMU】仮登録完了のお知らせ',
        text: registerMail(email, registerId)
      },
      type: 'temporarilyRegister',
      createdAt: serverTimestamp()
    })
    router.push('/sendmail')
    loading.finishLoading()
  }

  return {
    email,
    emailError,
    setEmail,
    signUpWithGoogle,
    signUpWithTwitter,
    onSubmitEmailSignup,
    getIsEmailUserExsits
  }
}

export default useSignUpForm
