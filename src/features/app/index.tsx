import AppBar from "./app-bar";
import Body from "./app-body";
import Sider from "./app-sider";
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSider } from '@/redux/app-slice';
import { RootState } from '@/redux'
import AppNewsProvider from "./app-news-provider";

export default function MiniDrawer() {
  const { isSiderOpen } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(setSider(true));

  };

  const handleDrawerClose = () => {
    dispatch(setSider(false));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={isSiderOpen} handleDrawerOpen={handleDrawerOpen} />
      <Sider open={isSiderOpen} handleDrawerClose={handleDrawerClose}>
        <AppNewsProvider />
      </Sider>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Body />
      </Box>
    </Box>
  );
}
