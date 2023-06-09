import React from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import { Popover, IconButton, Box, useMediaQuery } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import TuneIcon from '@mui/icons-material/Tune';

interface Props {
  body: React.ReactNode;
  width: number;
}

const SearchFilter = ({ width, body }: Props) => {
  const theme = useTheme();
  const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

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
            sx={{ marginTop: 2, marginLeft: mobile ? 1 : 2 }}
          >
            <Box
              p={3}
              sx={{
                width,
                boxSizing: 'border-box',
                right: 0,
                borderRadius: theme.spacing(8),
                maxHeight: 500,
              }}>
              {body}
            </Box>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

export default SearchFilter;