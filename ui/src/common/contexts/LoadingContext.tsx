import { Backdrop, CircularProgress, Stack } from '@mui/material'
import React, {
  createContext,
  ReactElement,
  useCallback,
  useMemo,
  useState
} from 'react'

type LoadingContextType = {
  isLoading: boolean
  startLoading: () => void
  finishLoading: () => void
}

export const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType
)

const LoadingProvider = ({
  children
}: {
  children: ReactElement<any, any>
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const finishLoading = useCallback(() => setIsLoading(false), [])
  const startLoading = useCallback(() => setIsLoading(true), [])
  const val = useMemo(
    () => ({ isLoading, startLoading, finishLoading }),
    [isLoading]
  )

  return (
    <LoadingContext.Provider value={val}>
      {children}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }}
        open={isLoading}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{
            height: '100vh',
            width: '100vw',
            paddingBottom: 4,
            paddingRight: 4
          }}
        >
          <CircularProgress color="secondary" />
        </Stack>
      </Backdrop>
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
