/* eslint-disable react/button-has-type */
import { Grid } from '@mui/material'
import type { NextPage } from 'next'
import AuthRoute from '../components/ui-elements/AuthRoute'
import LogOutButton from '../components/ui-elements/button/LogOutButton'
import DrawerLayOut from '../components/ui-parts/Layout/DrawerLayOut'

const Home: NextPage = () => (
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
        <Grid item xs={6}>
          <LogOutButton />
        </Grid>
      </Grid>
    </DrawerLayOut>
  </AuthRoute>
)

export default Home
