/* eslint-disable */
import React from 'react';
import { Stack, Avatar, Box, Typography } from '@mui/material';
import PopperMUI, { PopperPlacementType } from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useHistory } from 'react-router-dom';
import { useUser } from 'store/hooks/userHook';

const PopperBlog: React.FC = () => {
  const { isLoggedIn, logoutHandler } = useUser();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleLogout = (): void => {
    console.log('logout');
    logoutHandler();
    window.location.href = '/signin';
  };

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
              <Button sx={{ width: '100%' }} onClick={handleLogout}>
                {' '}
                Logout
              </Button>
            </Paper>
          </Fade>
        )}
      </PopperMUI>
      <Typography sx={{ display: 'flex' }}>
        <Avatar alt="Remy Sharp" src="assets/Avatar.png" />
        <IconButton sx={{ float: 'right' }} onClick={handleClick('bottom-end')}>
          <KeyboardArrowDownOutlinedIcon />
        </IconButton>
      </Typography>
    </Box>
  );
};
export default PopperBlog;
