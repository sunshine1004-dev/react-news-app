import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface NotiProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string
}

export interface ComponentProps {
  notification?: (props: NotiProps) => void;
}

const WithNotification = <P extends ComponentProps>(
  Component: React.ComponentType<P>
) => {
  // const [open, setOpen] = useState<boolean>(false);
  // const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  // const [messgae, setMessage] = useState<string>('');

  // const handleClose = (
  //   // event?: React.SyntheticEvent | Event,
  //   // reason?: string
  // ) => {
  //   // if (reason === 'clickaway') {
  //   //   return;
  //   // }

  //   setOpen(false);
  // };

  return (props: JSX.IntrinsicAttributes & P) => {
    const [open, setOpen] = useState<boolean>(false);
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [messgae, setMessage] = useState<string>('');

    const handleClose = (
      // event?: React.SyntheticEvent | Event,
      // reason?: string
    ) => {
      // if (reason === 'clickaway') {
      //   return;
      // }

      setOpen(false);
    };

    const notification = (props: NotiProps) => {
      setOpen(true);
      setSeverity(props.type);
      setMessage(props.message);
    };

    return (
      <>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert variant='filled' onClose={handleClose} severity={severity}>
            {messgae}
          </Alert>
        </Snackbar>
        <Component {...props} notification={notification} />
      </>
    );
  };
};

export default WithNotification;