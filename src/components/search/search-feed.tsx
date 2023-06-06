import { Tabs, Tab, Paper, IconButton, Stack, Box, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import { Feed } from './type';

interface Props {
  tabs: Feed[]
}

const SearchFeed = (props: Props) => {
  const [selected, setSelected] = React.useState<string>('all');

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleChange = (_event: React.SyntheticEvent, val: string) => {
    setSelected(val);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ paddingRight: 3 }}>
      <Stack direction='row'>
        <Tabs
          onChange={handleChange}
          value={selected}
          variant='scrollable'
          textColor='secondary'
          scrollButtons
        >
          <Tab key='all' value='all' label='All' />
          {
            props.tabs.map((tab, key) => (
              <Tab
                key={key}
                value={tab.url}
                label={tab.label}
              />
            ))
          }
        </Tabs>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </Stack>
    </Paper>
  )
}

export default SearchFeed;