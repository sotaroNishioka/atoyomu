import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

export const initFirebase = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp()

export const appCheck = (arg: FirebaseApp): void => {
  if (process.env.NEXT_PUBLIC_RECAPTCHA === undefined) return
  if (typeof document === 'undefined') return
  initializeAppCheck(arg, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA),
    isTokenAutoRefreshEnabled: true
  })
}

export const db = (() => {
  const res = getFirestore()
  if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(res, 'localhost', 8080)
  }
  return res
})()

export const auth = (() => {
  const res = getAuth()
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(res, 'http://localhost:9099')
  }
  return res
})()

export const functions = (() => {
  const res = getFunctions(initFirebase)
  res.region = 'asia-northeast1'
  if (process.env.NODE_ENV === 'development') {
    connectFunctionsEmulator(res, 'localhost', 5001)
  }
  return res
})()
