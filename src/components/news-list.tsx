import { useState, useRef, useEffect } from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewsCard from '@/components/news-card';
import Pagination from '@/components/pagination';
import data from '@/dataSource.json';


const PaginationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Dashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const step = 12;
  const [containerWidth, setContainerWidth] = useState<number>(0);

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
          data.articles.slice((page - 1) * step, page * step).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} lg={4}>
              <NewsCard data={item} />
            </Grid>
          ))
        }
      </Grid>
      <PaginationContainer sx={{ width: containerWidth }}>
        <Paper elevation={10} sx={{ padding: 1, borderRadius: 8 }}>
          <Pagination handleChange={handleChange} page={page} count={Math.floor(data.articles.length / 12)} />
        </Paper>
      </PaginationContainer>
    </Box>
  )
}

export default Dashboard