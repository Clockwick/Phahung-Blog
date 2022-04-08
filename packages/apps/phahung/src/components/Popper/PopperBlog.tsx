import React from 'react';
import Box from '@mui/material/Box';
import PopperMUI, { PopperPlacementType } from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useHistory } from 'react-router-dom';

const PopperBlog: React.FC = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleOnClick = () => {
    history.push('/profile');
    setOpen(false);
  };
  return (
    <Box>
      <PopperMUI
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ width: '200px' }}
      >
        {({ TransitionProps }) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={4}>
              <Button sx={{ width: '100%' }} onClick={handleOnClick}>
                Edit Profile
              </Button>
              <Button sx={{ width: '100%' }}> Logout</Button>
            </Paper>
          </Fade>
        )}
      </PopperMUI>
      <IconButton sx={{ float: 'right' }} onClick={handleClick('bottom-end')}>
        <KeyboardArrowDownOutlinedIcon />
      </IconButton>
    </Box>
  );
};
export default PopperBlog;
