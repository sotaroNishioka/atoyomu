import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ReactElement } from 'react'

export default function MyThemeProvider({
  children
}: {
  children: ReactElement<any, any>
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4D4D4D',
        light: '#FFFFFF'
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#CCCCCC',
        light: '#DDDDDD',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00'
      },
      background: {
        default: '#FFFDFA'
      },
      text: {
        primary: '#4D4D4D'
      }
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      // contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      // tonalOffset: 0.2
    },
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      // fontSize: 14
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
