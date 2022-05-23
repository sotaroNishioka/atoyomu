import { Facebook } from '@mui/icons-material'
import { Button } from '@mui/material'

const FacebookButton: React.FC<{ onClick: () => Promise<void> }> = ({
  onClick
}) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 1,
      mb: 2,
      backgroundColor: '#3B5998',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#3B5998'
      }
    }}
    startIcon={<Facebook />}
    onClick={onClick}
  >
    Facebook&nbsp;アカウントで登録[工事中]
  </Button>
)

export default FacebookButton
