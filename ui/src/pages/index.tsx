import { Card, Grid } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import Header from '../components/ui-parts/Header'

const Index: NextPage = () => (
  // const auth = useAuth()
  // const router = useRouter()

  // ログイン済みの場合は管理画面に遷移
  // useEffect(() => {
  //   if (auth.isLogin === true) {
  //     router.push('/home')
  //   }
  // }, [auth.isLogin])

  <div>
    <Header />
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '200vh' }}
    >
      <Grid item xs={6}>
        <Card variant="outlined">this is card</Card>
      </Grid>
    </Grid>
  </div>
)

export default Index
