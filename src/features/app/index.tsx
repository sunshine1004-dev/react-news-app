import AppBar from "./app-bar";
import Body from "./body";
import Sider from "./sider";
import { Box } from '@mui/material';
import Filter from '@/components/filter';

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
        <Filter />
      </Sider>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Body />
      </Box>
    </Box>
  );
}
