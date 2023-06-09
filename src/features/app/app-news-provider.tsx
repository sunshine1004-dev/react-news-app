import { MenuList, MenuItem, MenuItemProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setNewsApiQuery } from '@/redux/news-slice'
import { initialState, setGuardianQuery } from '@/redux/news-slice';

const Menu = styled(MenuList)(({ theme }) => `
  background: ${theme.palette.error.light};
  padding: ${theme.spacing(1, 2)};
  color: #fff;
  height: 100%;
`)

interface ItemProps extends MenuItemProps {
  active?: boolean;
}

const Item = styled(MenuItem)<ItemProps>(({ theme }) => `
  padding: ${theme.spacing(2)};
  border-radius: ${theme.spacing(2)};
  margin-top: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(1)};
`);

const AppNewsProvider = () => {
  const navigate = useNavigate();
  const [_searchParams, setSearchParams] = useSearchParams();


  const getNewsApi = () => {
    navigate('/newsapi');

    setNewsApiQuery(initialState.newsApiQuery);
    const query = Object.fromEntries(Object.entries(initialState.newsApiQuery).map(([key, value]) => [key, String(value)]));
    setSearchParams(query);
  }

  const getGuardian = () => {
    navigate('/guardian');

    setGuardianQuery(initialState.guardianQuery);
    const query = Object.fromEntries(Object.entries(initialState.guardianQuery).map(([key, value]) => [key, String(value)]));
    setSearchParams(query);
  }

  return (
    <Menu>
      <Item onClick={getNewsApi}>
        NewsAPI
      </Item>
      <Item onClick={getGuardian}>
        The Guardian
      </Item>
      <Item onClick={() => navigate('/nytimes')}>
        New York Times
      </Item>
    </Menu>
  )
}

export default AppNewsProvider;