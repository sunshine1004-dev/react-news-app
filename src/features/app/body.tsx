import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Root = styled(Container)(
  ({theme}) => `
    margin-top: ${theme.spacing(5)};
  `
)

const Body = () => {
  return (
    <Root>
      <Outlet />
    </Root>
  )
}

export default Body;