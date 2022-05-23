import Google from '@mui/icons-material/Google'
import { Button } from '@mui/material'

const GoogleButton: React.FC<{
  onClick: () => Promise<void>
  text: string
}> = ({ onClick, text }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 2,
      mb: 2,
      backgroundColor: '#4285F4',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#4285F4'
      }
    }}
    onClick={onClick}
    startIcon={<Google />}
  >
    {text}
  </Button>
)

export default GoogleButton
