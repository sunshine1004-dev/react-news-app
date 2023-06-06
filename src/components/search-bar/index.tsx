import { Input, Chip, Box, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Dropdown from '@/components/dropdown';

interface Props {
  sort?: boolean
}

const SearchBar = styled(Paper)(
  ({ theme }) => `
    padding: ${theme.spacing(2, 4)};
    border-radius: ${theme.spacing(10)}
  `
);

const Search = ({ sort }: Props) => {
  return (
    <Box>
      <SearchBar elevation={7}>
        <Input
          fullWidth
          placeholder='Input what you want to find...'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </SearchBar>
      <Stack direction='row' gap={2} mt={2}>
        <Chip label='React' variant='filled' color='primary' onDelete={() => console.log('hello')} />
        <Chip label='Full Stack' variant='filled' color='primary' onDelete={() => console.log('hello')} />
        <Box sx={{ flexGrow: 1 }} />

        {
          sort &&
          <Dropdown
            defaultValue='latest'
            sx={{ width: 150 }}
            size='small'
            option={[
              { value: 'latest', label: 'latest' },
              { value: 'popularity', label: 'popularity' }
            ]}
          />
        }

        <Dropdown
          defaultValue={10}
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
    </Box>
  )
}

export default Search;