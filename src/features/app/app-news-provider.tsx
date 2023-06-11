import { MenuList, MenuItem, MenuItemProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { setNewsApiQuery } from '@/redux/news-slice'
import { initialState, setGuardianQuery } from '@/redux/news-slice';
import { useLocation } from 'react-router-dom';
import { history } from "@/utility/common";

const Menu = styled(MenuList)(({ theme }) => `
  background: ${theme.palette.error.light};
  padding: ${theme.spacing(1, 2)};
  color: #fff;
  height: 100%;
`)

interface ItemProps extends MenuItemProps {
  active: number;
}

const Item = styled(MenuItem)<ItemProps>(({ theme, active }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  border: '1px solid',
  borderColor: active ? '#ccc' : 'transparent',
  background: active ? '#ffffff33' : 'transparent',
  transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow']),
  boxShadow: active ? '0px 0px 15px #ffffff55' : 'none',
  '&:hover': {
    background: active ? '#ffffff33' : 'transparent',
    boxShadow: 'none',
  }
}));

export const initializeNewsApi = () => {
  history.navigate('/newsapi');

  setNewsApiQuery(initialState.newsApiQuery);
  const query = Object.fromEntries(Object.entries(initialState.newsApiQuery).map(([key, value]) => [key, String(value)]));
  history.search.setSearchParams(query);
}

export const initializeGuardian = () => {
  history.navigate('/guardian');

  setGuardianQuery(initialState.guardianQuery);
  const query = Object.fromEntries(Object.entries(initialState.guardianQuery).map(([key, value]) => [key, String(value)]));
  history.search.setSearchParams(query);
}

const AppNewsProvider = () => {
  const path = useLocation().pathname;

  return (
    <Menu>
      <Item onClick={initializeNewsApi} active={Number(path.startsWith('/newsapi'))}>
        NewsAPI
      </Item>
      <Item onClick={initializeGuardian} active={Number(path.startsWith('/guardian'))}>
        The Guardian
      </Item>
      {/* <Item onClick={() => navigate('/nytimes')}>
        New York Times
      </Item> */}
    </Menu>
  )
}

export default AppNewsProvider;