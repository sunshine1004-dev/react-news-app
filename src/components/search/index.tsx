import { useRef, useEffect, useState } from 'react'
import { InputBase, Box, Stack, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from '@/components/dropdown';
import SearchFeed from './search-feed';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import SearchFilter from './search-filter';
import { NewsApiFilter } from '@/components/filter';

interface Props {
  sort?: boolean;
  count?: number;
}

const SearchBar = styled(Paper)(
  ({ theme }) => `
    padding: ${theme.spacing(1, 2, 1, 3)};
    border-radius: ${theme.spacing(10)};
    display: flex;
  `
);

const Search = ({ sort=false, count=0 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <Box>
      <SearchBar elevation={7} ref={containerRef}>
        <InputBase
          fullWidth
          placeholder='Input what you want to find...'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <SearchFilter width={containerWidth} body={<NewsApiFilter />} />
      </SearchBar>

      <Stack gap={2} mt={2}>
        <SearchFeed tabs={[{ label: 'sports', url: '/sports' }, { label: 'family', url: '/family' }]} />
        <Stack direction='row' gap={2} alignItems='center'>
          <RssFeedIcon />
          <Typography
            sx={{ flexGrow: 1 }}
            color='gray'
          >
            {count}
          </Typography>

          {
            sort &&
            <Dropdown
              defaultValue='relevancy'
              variant='outlined'
              handleChange={(val) => console.log(val) }
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
            handleChange={(val) => console.log(val) }
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