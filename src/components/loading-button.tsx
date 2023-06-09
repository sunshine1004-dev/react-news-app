import { ReactNode } from 'react';
import { Button, CircularProgress, Box, ButtonProps } from "@mui/material";
import { blue } from '@mui/material/colors';

interface Props extends ButtonProps {
  loading: boolean,
  children: ReactNode,
}

const LoadingBtn = ({ loading, children, ...params }: Props) => {
  return (
    <Box sx={{position: 'relative'}}>
      <Button 
        disabled={loading}
        { ...params }
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: blue[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default LoadingBtn;
