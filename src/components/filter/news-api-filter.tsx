import React from 'react'
import { TextField, Box, Button, Grid, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, MultiInputDateRangeField, DateRange } from '@mui/x-date-pickers-pro';
import Dropdown from '@/components/dropdown';
import CountrySelector from '@/components/country-selector';
import LangSelector from '@/components/lang-selector';
import { categories } from '@/static';
import 'dayjs/locale/en';
import { capitalize } from '@/utility/common';
import { NewsApiQuery } from '@/type'
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  query: NewsApiQuery;
  handleSearch: (query: NewsApiQuery) => void;
}


const NewsApiFilter = ({ query, handleSearch }: Props) => {
  const [category, setCategory] = React.useState<string>(query.category || '');
  const [country, setCountry] = React.useState<string>(query.country || '');
  const [sources, setSources] = React.useState<string>(query.sources || '');
  const [author, setAuthor] = React.useState<string>(query.author || '');
  const [language, setLanguage] = React.useState<string | null>(query.language || null);
  const [range, setRange] = React.useState<[Dayjs | null, Dayjs | null]>([query.from ? dayjs(query.from) : null, query.to ? dayjs(query.from) : null]);
  const [fromDate, setFromDate] = React.useState<string>(query.from || '');
  const [toDate, setToDate] = React.useState<string>(query.to || '');

  const onSearch = () => {
    const searchParams = {
      country,
      category,
      sources,
      author,
      language: language as string | undefined,
      from: fromDate,
      to: toDate
    };
    handleSearch(searchParams);
  };

  const handleDateRange = (dateRange: DateRange<Dayjs>) => {
    setRange(dateRange);
  };

  const setDateRange = (dateRange: DateRange<Dayjs>) => {
    if (dateRange[0]) {
      setFromDate(dateRange[0].toISOString());
    }
    if (dateRange[1]) {
      setToDate(dateRange[1].toISOString());
    }
  }

  const handleError = (errors: (string | null)[]) => {
    if (errors[0] === null && errors[1] === null) {
      setDateRange(range);
    }
  }

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
            <CountrySelector
              handleChange={setCountry}
              value={country}
            />
          </Grid>

          <Grid md={4} item></Grid>

          <Grid item xs={12} md={4}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Source</Typography>
            <TextField
              fullWidth
              placeholder='sources'
              value={sources}
              onChange={e => setSources(e.target.value)}
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Author</Typography>
            <TextField
              fullWidth
              placeholder='author'
              size='small'
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Language</Typography>
            <LangSelector
              value={language}
              handleChange={setLanguage}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography color='grey' gutterBottom variant='subtitle2'>Published Date</Typography>
            <MultiInputDateRangeField
              value={range}
              onError={(newError) => handleError(newError)}
              onChange={handleDateRange}
              disableFuture
              slotProps={{
                textField: ({ position }) => ({
                  label: position === 'start' ? 'From' : 'To',
                  size: 'small'
                }),
              }}
            />
          </Grid>

          <Grid item container xs={12} justifyContent='flex-end'>
            <Button
              sx={{ mr: 2 }}
              variant='outlined'
              startIcon={<FavoriteIcon />}
            >
              Save
            </Button>
            <Button variant='contained' onClick={onSearch}>Search</Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  )
}

export default NewsApiFilter;