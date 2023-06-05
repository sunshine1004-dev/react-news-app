import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import NewsCard from '@/components/news-card';
import Search from './dashboard-search';
import Pagination from '@/components/pagination';
import data from '@/dataSource.json';

const Dashboard = () => {
  const [page, setPage] = useState<number>(1);
  const step = 12;

  const handleChange = (num: number) => {
    setPage(num);
  }

  return (
    <Box>
      <Search />
      <Grid container pt={3} spacing={3}>
        {
          data.articles.slice((page - 1) * step, page * step).map((item, index) => (
            <Grid item key={index} xs={12} sm={6} lg={4}>
              <NewsCard data={item} />
            </Grid>
          ))
        }
      </Grid>
      <Pagination handleChange={handleChange} page={page} count={Math.floor(data.articles.length / 12)} />
    </Box>
  )
}

export default Dashboard