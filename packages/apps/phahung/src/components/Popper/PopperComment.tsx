/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { JSXElementConstructor, ReactElement, useMemo } from 'react';
import Box from '@mui/material/Box';
import PopperMUI, { PopperPlacementType } from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { useUser } from 'store/hooks/userHook';

interface PopperCommentProps {
  visible: boolean;
  isOwner: boolean;
  handleCanEdit: () => void;
  handleDelete: () => void;
  handleHideComment: () => void;
  handleUnHideComment: () => void;
  handleBanUser: () => void;
}
const PopperComment: React.FC<PopperCommentProps> = ({
  visible,
  isOwner,
  handleCanEdit,
  handleDelete,
  handleHideComment,
  handleUnHideComment,
  handleBanUser,
}): ReactElement<any, string | JSXElementConstructor<any>> => {
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
    handleDelete();
    setOpen(false);
  };
  const handleOnClickHideComment = () => {
    handleHideComment();
    setOpen(false);
  };
  const handleOnClickUnHideComment = () => {
    handleUnHideComment();
    setOpen(false);
  };
  const handleOnClickBanUser = () => {
    handleBanUser();
    setOpen(false);
  };
  const isAdmin = useMemo(() => user?.role === 0, [user]);
  const isAdminAndOwner = useMemo(() => isAdmin && isOwner, [isAdmin, isOwner]);

  const renderAdminInteractionList = (): ReactElement<
    any,
    string | JSXElementConstructor<any>
  > => (
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
              {visible ? (
                <Button
                  sx={{ width: '100%' }}
                  onClick={() => handleOnClickHideComment()}
                >
                  Hide Comment
                </Button>
              ) : (
                <Button
                  sx={{ width: '100%' }}
                  onClick={() => handleOnClickUnHideComment()}
                >
                  Unhide Comment
                </Button>
              )}
              <Button
                sx={{ width: '100%' }}
                onClick={() => handleOnClickBanUser()}
              >
                {' '}
                Ban User
              </Button>
              <Button
                sx={{ width: '100%', color: 'red' }}
                onClick={() => handleOnClickDeleteComment()}
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

  const renderUserInteractionList = (): ReactElement<
    any,
    string | JSXElementConstructor<any>
  > => (
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
                onClick={() => handleDelete()}
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

  return isAdminAndOwner || !isAdmin
    ? renderUserInteractionList()
    : renderAdminInteractionList();
};
export default PopperComment;
