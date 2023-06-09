import { Tabs, Tab, Paper, IconButton, Stack, Box, Menu, MenuItem, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { createFeed, FeedState, removeFeed as removeFeedAction } from '@/redux/feed-slice';
import { useSearchParams, useLocation, useNavigate, To } from 'react-router-dom';
import FeedDialog from './search-feed-modal';
import { Feed } from '@/type'


interface Props {
  backDefault: () => void;
}

const SearchFeed = ({ backDefault }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { feeds } = useSelector<RootState, FeedState>((state) => state.feed);
  const [searchParams] = useSearchParams();

  const [feed, setFeed] = React.useState<string>('');
  const [feedModal, setFeedModal] = React.useState<boolean>(false);
  const [method, setMethod] = React.useState<'add' | 'update'>('add');

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleChange = (_event: React.SyntheticEvent, val: string) => {
    if (val === '') {
      backDefault();
    } else {
      const selected = feeds.find(item => item.id === val);
      if (selected) {
        navigate(selected?.queryString as To);
      }
    }
    setFeed(val);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };


  // add, edit and remove feed
  const handleConfirm = (title: string) => {
    if (method === 'add') {
      const newFeed: Feed = {
        label: title,
        query: Object.fromEntries(searchParams.entries()),
        queryString: location.pathname + location.search,
      };
      dispatch(createFeed({ feed: newFeed }));
    } else {
      const updated = Object.assign({}, feeds.find(item => item.id === feed));
      updated.label = title;
      updated.query = Object.fromEntries(searchParams.entries());
      updated.queryString = location.pathname + location.search;
      dispatch(createFeed({ feed: updated as Feed, id: updated?.id }));
    }

    setFeedModal(false);
  }

  const setAdd = () => {
    setMethod('add');
    setFeedModal(true);
  };

  const setUpdate = () => {
    setMethod('update');
    setFeedModal(true);
  }

  const removeFeed = () => {
    dispatch(removeFeedAction(feed));
    setFeed('');
  }

  return (
    <Paper sx={{ paddingRight: 3 }}>
      <Stack direction='row'>
        <Box sx={{ flexGrow: 1 }} width={300}>
          <Tabs
            onChange={handleChange}
            value={feed}
            variant='scrollable'
            textColor='secondary'
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab key='all' value='' label='All' />
            {
              feeds.map(item => (
                <Tab
                  key={item.id}
                  value={item.id}
                  label={item.label}
                />
              ))
            }
          </Tabs>
        </Box>

        <Divider orientation='vertical' flexItem sx={{mx: 2}} />

        <IconButton onClick={setAdd}>
          <AddIcon />
        </IconButton>
        <IconButton disabled={feed === ''} onClick={setUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton disabled={feed === ''} onClick={removeFeed}>
          <DeleteIcon />
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

      <FeedDialog
        open={feedModal}
        handleClose={() => setFeedModal(false)}
        handleOk={handleConfirm}
        method={method}
        feedTitle={feeds.find(item => item.id === feed)?.label}
      />
    </Paper>
  )
}

export default SearchFeed;