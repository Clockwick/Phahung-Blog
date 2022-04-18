import React from 'react';
import Box from '@mui/material/Box';
import PopperMUI, { PopperPlacementType } from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { useUser } from 'store/hooks/userHook';

interface PopperCommentProps {
  id: string;
  handleCanEdit: () => void;
  handleDelete: (id: string) => void;
  handleHideComment: (id: string) => void;
}

const PopperComment: React.FC<PopperCommentProps> = ({
  id,
  handleCanEdit,
  handleDelete,
  handleHideComment,
}) => {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const { user } = useUser();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const handleOnClickEditComment = () => {
    handleCanEdit();
    setOpen(false);
  };
  const handleOnClickDeleteComment = () => {
    handleDelete(id);
    setOpen(false);
  };
  const handleOnClickHideComment = () => {
    handleHideComment(id);
    setOpen(false);
  };
  const isAdmin = user?.role === 'admin';
  // console.log(user?.role);

  return isAdmin ? (
    <Box sx={{}}>
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
              <Button
                sx={{ width: '100%', color: 'red' }}
                onClick={() => handleOnClickDeleteComment()}
              >
                {' '}
                Delete Comment
              </Button>
              <Button
                sx={{ width: '100%' }}
                onClick={() => handleOnClickHideComment()}
              >
                {' '}
                Hide Comment
              </Button>
              <Button
                sx={{ width: '100%' }}
                onClick={() => handleOnClickDeleteComment()}
              >
                {' '}
                Ban User
              </Button>
            </Paper>
          </Fade>
        )}
      </PopperMUI>
      <IconButton sx={{ float: 'right' }} onClick={handleClick('bottom-end')}>
        <MoreHorizIcon />
      </IconButton>
    </Box>
  ) : (
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
              <Button sx={{ width: '100%' }} onClick={handleOnClickEditComment}>
                Edit Comment
              </Button>
              <Button
                sx={{ width: '100%', color: 'red' }}
                onClick={() => handleDelete(id)}
              >
                {' '}
                Delete Comment
              </Button>
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
