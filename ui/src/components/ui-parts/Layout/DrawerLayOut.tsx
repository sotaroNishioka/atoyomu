import { Box } from '@mui/material'
import React, { ReactElement } from 'react'
import Drawer from '../Drawer'
import Header from '../Header'

const DrawerLayOut = ({ children }: { children: ReactElement<any, any> }) => (
  <Box sx={{ display: 'flex' }}>
    <Header />
    <Drawer />
    {children}
  </Box>
)

export default DrawerLayOut
