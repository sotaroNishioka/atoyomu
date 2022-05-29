/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import AuthRoute from '../components/functional/AuthRoute'
import DrawerLayOut from '../components/ui-parts/Layout/DrawerLayOut'

const Home: NextPage = () => {
  useEffect(() => {
    const f = async () => {
      // const url = 'https://twitter.com/mametter/status/1529767054169239553'
      // const response = await fetch(
      //   `https://publish.twitter.com/oembed?url=${url}`
      // )
      // const mimeType = response.headers.get('content-type')
      // console.log('mimeType')
      // console.log(mimeType)
      // console.log('mimeType')
      // const data = await response.text()
      // const htmlDoc = new DOMParser().parseFromString(data, 'text/html')
      // console.log(htmlDoc)
      console.log('home')
    }
    f()
  }, [])
  return (
    <AuthRoute>
      <DrawerLayOut>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '120vh' }}
        >
          <Grid item xs={6} />
        </Grid>
      </DrawerLayOut>
    </AuthRoute>
  )
}

export default Home
