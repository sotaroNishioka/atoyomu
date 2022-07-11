import { Twitter } from '@mui/icons-material'
import { Button } from '@mui/material'

const TwitterButton: React.FC<{ onClick: () => Promise<void> }> = ({
  onClick
}) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 1,
      mb: 2,
      backgroundColor: '#00acee',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#00acee'
      }
    }}
    startIcon={<Twitter />}
    onClick={onClick}
  >
    Twitter&nbsp;&nbsp;&nbsp;&nbsp;アカウントで登録[工事中]
  </Button>
)

export default TwitterButton
