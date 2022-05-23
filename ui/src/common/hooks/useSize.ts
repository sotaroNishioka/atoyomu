import { Theme, useMediaQuery } from '@mui/material'

const useSize = () => {
  const isMobileSize = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  )

  const headerHight = isMobileSize ? 56 : 64

  return { isMobileSize, headerHight }
}

export default useSize
