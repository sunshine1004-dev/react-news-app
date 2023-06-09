import { ReactNode } from 'react';
import { Card, CardProps, useMediaQuery, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  children: ReactNode
}

type ResponsiveCardProps = CardProps & {
  mobile: string
}

const Container = styled(Card)<ResponsiveCardProps>(
  ({ theme, mobile }) => `
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: ${mobile === 'mobile' ? '100%' : '500px'};
  border-color: ${mobile === 'mobile' ? '#fff' : '#ccc'};
  padding: ${theme.spacing(3)};
  box-sizing: border-box;
  `
)

const AuthForm = (props: Props) => {
  const match = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <Container mobile={match ? 'desktop' : 'mobile'} variant='outlined'>
      {props.children}
    </Container>
  )
}

export default AuthForm
