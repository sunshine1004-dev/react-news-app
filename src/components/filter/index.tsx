import { TextField, Box, Stack, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider, MultiInputDateRangeField } from '@mui/x-date-pickers-pro';
import Dropdown from '@/components/dropdown';
import 'dayjs/locale/en';

const Filter = () => {
  return (
    <Box p={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <Stack direction='column' gap={4}>
          <Dropdown
            label='Category'
            size='small'
            option={[
              { value: 'computer', label: 'computer' },
              { value: 'react', label: 'React' },
              { value: 'laravel', label: 'Laravel' },
              { value: 'sports', label: 'Sports' },
              { value: 'culture', label: 'Culture' }
            ]}
          />
          <TextField fullWidth label='author' size='small' />
          <TextField fullWidth label='source' size='small' />


          <MultiInputDateRangeField
            slotProps={{
              textField: ({ position }) => ({
                label: position === 'start' ? 'From' : 'To',
                size: 'small'
              }),
            }}
          />

          <Stack direction='column' gap={2}>
            <Button variant='outlined' startIcon={<FavoriteIcon />}>
              Save
            </Button>
            <Button variant='contained' fullWidth>Search</Button>
          </Stack>
        </Stack>
      </LocalizationProvider>
    </Box>
  )
}

export default Filter;