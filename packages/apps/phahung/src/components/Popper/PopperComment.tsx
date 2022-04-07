import React from 'react';
import Box from '@mui/material/Box';
import PopperMUI, { PopperPlacementType } from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';

interface PopperCommentProps {
  handleCanEdit: () => void;
}

const PopperComment: React.FC<PopperCommentProps> = ({ handleCanEdit }) => {
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
    handleCanEdit();
    setOpen(false);
  };
  return (
    <Box sx={{ width: 500 }}>
      <PopperMUI
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ width: '200px' }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={4}>
              <Button sx={{ width: '100%' }} onClick={handleOnClick}>
                Edit Comment
              </Button>
              <Button sx={{ width: '100%' }}> Delete Comment</Button>
            </Paper>
          </Fade>
        )}
      </PopperMUI>
      <IconButton sx={{ float: 'right' }} onClick={handleClick('bottom-end')}>
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
};
export default PopperComment;
