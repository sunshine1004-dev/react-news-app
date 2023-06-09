import { useRef, useEffect, useState, useMemo } from 'react'
import { InputBase, Box, Stack, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from '@/components/dropdown';
import SearchFeed from './search-feed';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SearchFilter from './search-filter';
import { NewsApiFilter } from '@/components/filter';
import { NewsApiQuery } from '@/type'

interface Props {
  sort?: boolean;
  total?: number;
  pageSize?: number;
  query?: string;
  queryObj?: NewsApiQuery;
  setQuery: (q: string) => void;
  setPageSize: (pageSize: number) => void;
  setFilter: (query: NewsApiQuery) => void;
  setDefault: () => void;
}

const SearchBar = styled(Paper)(
  ({ theme }) => `
    padding: ${theme.spacing(1, 2, 1, 3)};
    border-radius: ${theme.spacing(10)};
    display: flex;
  `
);

const Search = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { sort, total, pageSize, query, setQuery, setPageSize, setFilter, queryObj, setDefault } = props;

  const [queryString, setQueryString] = useState(query);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    if (containerRef.current) {
      window.addEventListener('resize', handleResize);
      setContainerWidth(containerRef.current.offsetWidth);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useMemo(() => {
    setQueryString(query);
  }, [query]);


  return (
    <Box>
      <SearchBar elevation={7} ref={containerRef}>
        <InputBase
          fullWidth
          placeholder='Input what you want to find...'
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setQuery(queryString || '')}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <SearchFilter
          width={containerWidth}
          body={<NewsApiFilter query={queryObj || {}} handleSearch={setFilter} />}
        />
      </SearchBar>

      <Stack gap={2} mt={2}>
        <SearchFeed backDefault={setDefault} />
        <Stack direction='row' gap={2} alignItems='center'>
          <RssFeedIcon />
          <Typography
            sx={{ flexGrow: 1 }}
            color='gray'
          >
            {total}
          </Typography>

          {
            sort &&
            <Dropdown
              defaultValue='relevancy'
              variant='outlined'
              handleChange={(val) => console.log(val)}
              sx={{ width: 150 }}
              size='small'
              option={[
                { value: 'relevancy', label: 'relevancy' },
                { value: 'popularity', label: 'popularity' },
                { value: 'publishedAt', label: 'publishedAt' },
              ]}
            />
          }

          <Dropdown
            defaultValue={10}
            variant='outlined'
            value={pageSize}
            handleChange={(val) => setPageSize(Number(val))}
            sx={{ width: 80 }}
            size='small'
            option={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
            ]}
          />
        </Stack>
      </Stack>
    </Box>
  )
}

export default Search;