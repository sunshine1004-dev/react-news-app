import React from 'react'
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, MultiInputDateRangeField } from '@mui/x-date-pickers-pro';
import Dropdown from '@/components/dropdown';
import CountrySelector from '@/components/country-selector';
import LangSelector from '@/components/lang-selector';
import { categories } from '@/static';
import 'dayjs/locale/en';
import { capitalize } from '@/utility/common';

const NewsApiFilter = () => {
  const [category, setCategory] = React.useState<string>('');

  return (
    <Box p={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <Grid container spacing={2}>
    
          <Grid item xs={12} md={4}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Category</Typography>
            <Dropdown
              variant='outlined'
              value={category}
              handleChange={setCategory}
              fullWidth
              size='small'
              option={categories.map(item => ({ label: capitalize(item), value: item }))}
            />

          </Grid>

          <Grid item xs={12} md={4}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Country</Typography>
            <CountrySelector />
          </Grid>

          <Grid md={4} item></Grid>

          <Grid item xs={12} md={4}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Source</Typography>
            <TextField
              fullWidth
              placeholder='source'
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Author</Typography>
            <TextField fullWidth placeholder='author' size='small' />
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Language</Typography>
            <LangSelector />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Published Date</Typography>
            <MultiInputDateRangeField
              slotProps={{
                textField: ({ position }) => ({
                  label: position === 'start' ? 'From' : 'To',
                  size: 'small'
                }),
              }}
            />
          </Grid>

          <Grid item container xs={12} justifyContent='flex-end'>
            <Button sx={{ mr: 2 }} variant='outlined' startIcon={<FavoriteIcon />}>
              Save
            </Button>
            <Button variant='contained'>Search</Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  )
}

export default NewsApiFilter;