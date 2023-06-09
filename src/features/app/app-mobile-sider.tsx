import React from 'react';
import { Drawer as MuiDrawer, Divider, IconButton, Typography } from '@mui/material';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  children: React.ReactNode;
  handleDrawerClose: () => void;
  open: boolean
}

const drawerWidth = 330;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0
});

const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    width: drawerWidth,
    zIndex: 13000,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  background: theme.palette.error.light,
  paddingLeft: theme.spacing(4),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const MobileSider = ({ children, handleDrawerClose, open }: Props) => {

  const theme = useTheme();

  return (
    <Drawer variant="temporary" open={open}>
      <DrawerHeader>
        <Typography variant='h6' sx={{ color: '#fff' }}>News App</Typography>
        <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  )
}

export default MobileSider;
