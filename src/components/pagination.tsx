import { ChangeEvent } from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface Props {
  count: number;
  handleChange: (pageNum: number) => void;
  page: number
}

const Pagination = ({ count, handleChange, page }: Props) => {

  const onChange = (_event: ChangeEvent<unknown>, value: number) => {
    handleChange(value)
  };


  return (
    <Box mt={3}>
      <MuiPagination
        page={page}
        sx={{
          display: "contents",
          ".MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
        onChange={onChange}
        count={count}
        color="primary"
        boundaryCount={2}
      />
    </Box>
  );
};

export default Pagination;