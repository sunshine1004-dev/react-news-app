import { MenuList, MenuItem, MenuItemProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Menu = styled(MenuList)(({theme}) => `
  background: ${theme.palette.grey[700]};
  padding: ${theme.spacing(1, 2)};
  color: #fff;
  height: 100%;
`)

interface ItemProps extends MenuItemProps {
  active?: boolean;
}

const Item = styled(MenuItem)<ItemProps>(({theme}) => `
  padding: ${theme.spacing(2)};
  border-radius: ${theme.spacing(2)};
  margin-top: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(1)};
`);

const AppNewsProvider = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      <Item onClick={() => navigate('/newsapi')}>
        NewsAPI
      </Item>
      <Item onClick={() => navigate('/guardian')}>
        The Guardian
      </Item>
      <Item onClick={() => navigate('/nytimes')}>
        New York Times
      </Item>
    </Menu>
  )
}

export default AppNewsProvider;