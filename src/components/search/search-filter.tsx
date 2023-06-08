import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Popover, IconButton, Box } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import TuneIcon from '@mui/icons-material/Tune';

interface Props {
  body: React.ReactNode;
  width: number;
}

const SearchFilter = ({ width, body }: Props) => {
  const theme = useTheme();

  return (
    <PopupState variant='popover' popupId="demo-popup-popover">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)}>
            <TuneIcon />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            <Box
              p={3}
              sx={{ width, boxSizing: 'border-box', right: 0, borderRadius: theme.spacing(8) }}>
              { body }
            </Box>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

export default SearchFilter;