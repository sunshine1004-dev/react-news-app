import { Popover, IconButton, Box, Typography } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import TuneIcon from '@mui/icons-material/Tune';


const SearchFilter = () => {
  return (
    <PopupState variant='popover' popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <TuneIcon />
          </IconButton>
          <Popover
            { ...bindPopover(popupState) }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{marginTop: 2}}
          >
            <Box p={3} sx={{width: '100%'}}>
              <Typography>Hello world!</Typography>
            </Box>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

export default SearchFilter;