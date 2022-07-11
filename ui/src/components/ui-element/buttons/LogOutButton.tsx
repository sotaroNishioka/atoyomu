import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button } from '@mui/material'
import useAuth from '../../../common/hooks/useAuth'

const LogOutButton: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={signOut}
      startIcon={<ExitToAppIcon />}
    >
      ログアウト
    </Button>
  )
}

export default LogOutButton
