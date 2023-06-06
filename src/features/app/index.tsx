import AppBar from "./app-bar";
import Body from "./app-body";
import Sider from "./app-sider";
import { Box } from '@mui/material';
import AppNewsProvider from "./app-news-provider";

import * as React from 'react';

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sider open={open} handleDrawerClose={handleDrawerClose}>
        <AppNewsProvider />
      </Sider>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Body />
      </Box>
    </Box>
  );
}
