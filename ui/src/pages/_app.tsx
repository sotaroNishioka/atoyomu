/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import IndexProvider from '../common/contexts/IndexProvider'
import MyThemeProvider from '../common/contexts/MyThemeProvider'
import { appCheck, initFirebase } from '../common/firebase/firebaseApp'

function MyApp({ Component, pageProps }: AppProps) {
  // firebaseの初期化
  initFirebase
  appCheck(initFirebase)

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <MyThemeProvider>
        <IndexProvider>
          <Component {...pageProps} />
        </IndexProvider>
      </MyThemeProvider>
    </>
  )
  return <Component {...pageProps} />
}

export default MyApp
