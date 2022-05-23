import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button } from '@mui/material'

const LogOutButton: React.FC = () => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    onClick={() => console.log('logout')}
    startIcon={<ExitToAppIcon />}
  >
    ログアウト
  </Button>
)

export default LogOutButton
