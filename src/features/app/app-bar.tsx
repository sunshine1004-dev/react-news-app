import { AppBar as MuiAppBar, Toolbar, Button, IconButton } from '@mui/material';
import { useMatch, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '@/redux';
import { styled } from '@mui/material/styles';
import { logOut as logOutAction } from '@/redux/auth-slice';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Props {
  open: boolean;
  handleDrawerOpen: () => void
}

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default ({ open, handleDrawerOpen }: Props) => {
  const dispatch = useDispatch();
  const isSignUp = useMatch('/sign-up');
  const isSignIn = useMatch('/sign-in');
  const navigation = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const logOut = () => {
    dispatch(logOutAction());
  }

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar sx={{ background: '#2a3642' }}>
        {
          isAuthenticated && (
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )
        }

        <div style={{ flexGrow: 1 }}></div>

        {
          isSignUp &&
          <Button onClick={() => navigation('/sign-in')} sx={{ color: '#fff' }}>Sign In</Button>
        }
        {
          isSignIn &&
          <Button onClick={() => navigation('sign-up')} sx={{ color: '#fff' }}>Sign Up</Button>
        }

        {
          isAuthenticated &&
          <Button sx={{ color: '#fff' }} onClick={logOut}>Log out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}