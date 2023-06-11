import { useEffect } from "react";
import AppBar from "./app-bar";
import Body from "./app-body";
import Sider from "./app-sider";
import MobileSider from './app-mobile-sider';
import { Box, useMediaQuery, Theme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setSider, LayoutState } from '@/redux/app-slice';
import { RootState } from '@/redux'
import AppNewsProvider from "./app-news-provider";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { history } from '@/utility/common'
import { AuthState } from "@/redux/auth-slice";
import { getFeeds } from '@/redux/feed-slice';

export default function MiniDrawer() {
  const { isSiderOpen } = useSelector<RootState, LayoutState>((state) => state.app);
  const { isAuthenticated } = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();

  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [search, setSearch ] = useSearchParams();

  // initialize custom history 
  history.location = useLocation();
  history.navigate = useNavigate();
  history.search = {
    searchParams: search,
    setSearchParams: setSearch
  }

  const handleDrawerOpen = () => {
    dispatch(setSider(true));
  };

  const handleDrawerClose = () => {
    dispatch(setSider(false));
  };

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={isSiderOpen && isAuthenticated && desktop} handleDrawerOpen={handleDrawerOpen} />
      {
        desktop ? (
          <Sider open={isSiderOpen && isAuthenticated} handleDrawerClose={handleDrawerClose}>
            <AppNewsProvider />
          </Sider>
        ) : (
          <MobileSider open={isSiderOpen} handleDrawerClose={handleDrawerClose}>
            <AppNewsProvider />
          </MobileSider>
        )
      }
      <Box component="main" sx={{ flexGrow: 1, p: desktop ? 3 : 0, pt: 3 }}>
        <Body />
      </Box>
    </Box>
  );
}
