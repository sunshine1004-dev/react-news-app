import { useState, useRef, useEffect } from 'react';
import { Grid, Box, Paper, useMediaQuery, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewsCard from '@/components/news-card';
import Pagination from '@/components/pagination';
import data from '@/dataSource.json';

interface Props {
  page: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void; 
}

const PaginationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Dashboard = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { page, pageSize, total, setPage } = props;
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = (num: number) => {
    setPage(num);
  }

  return (
    <Box ref={containerRef}>
      <Grid
        container
        pt={3}
        spacing={3}
        position='relative'
      >
        {
          data.articles.slice((page - 1) * pageSize, page * pageSize).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} lg={4}>
              <NewsCard data={item} />
            </Grid>
          ))
        }
      </Grid>
      <PaginationContainer sx={{ width: containerWidth }}>
        <Paper elevation={10} sx={{ padding: 1, borderRadius: 8 }}>
          <Pagination mobile={mobile} handleChange={handleChange} page={page} count={Math.floor(total / pageSize)} />
        </Paper>
      </PaginationContainer>
    </Box>
  )
}

export default Dashboard