import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button } from '@mui/material'
import { useState } from 'react'

interface Props {
  open: boolean;
  feedTitle?: string;
  handleClose: () => void;
  handleOk: (title: string) => void;
  method: 'add' | 'update';
}

const FeedDialog = ({ open, handleClose, feedTitle, handleOk, method }: Props) => {
  const [title, setTitle] = useState(feedTitle || '');

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{method === 'add' ? 'Add Feed' : feedTitle}</DialogTitle>
      <DialogContent sx={{ width: 300 }}>
        <TextField
          value={title}
          size='small'
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>cancel</Button>
        <Button variant='contained' color='error' onClick={() => title ? handleOk(title) : () => { }}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FeedDialog;