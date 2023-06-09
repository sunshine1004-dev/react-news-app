import { ChangeEvent } from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface Props {
  count: number;
  handleChange: (pageNum: number) => void;
  page: number;
  mobile: boolean;
}

const Pagination = ({ count, handleChange, page, mobile }: Props) => {

  const onChange = (_event: ChangeEvent<unknown>, value: number) => {
    handleChange(value)
  };

  return (
    <Box>
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
        siblingCount={mobile ? 0 : 1}
        boundaryCount={mobile ? 1 : 2}
      />
    </Box>
  );
};

export default Pagination;