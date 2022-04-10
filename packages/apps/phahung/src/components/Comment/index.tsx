/* eslint-disable no-nested-ternary */
import {
  Typography,
  Stack,
  Rating,
  Paper,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import PopperComment from 'components/Popper/PopperComment';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const HiddenAndShowButton = styled(Button)({
  paddingX: '4px',
  minWidth: 'min-content',
});

interface IComment {
  id: string;
  content: string;
  likes: number;
  handleDelete: (id: string) => void;
  decrementLikes: (id: string) => void;
  incrementLikes: (id: string) => void;
}

const Comment: React.FC<IComment> = ({
  id,
  content,
  likes,
  handleDelete,
  decrementLikes,
  incrementLikes,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [like, setLike] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [comment, setComment] = useState(content);
  const handleCanEdit = (): void => {
    setCanEdit(true);
  };
  const handleOnclick = () => {
    setLike((prevState) => {
      if (prevState) {
        console.log('prevState', prevState);
        decrementLikes(id);
        setLike(false);
      } else if (!prevState) {
        console.log('prevState', prevState);
        incrementLikes(id);
        console.log('asd');
        setLike(true);
      }
      return !prevState;
    });
  };

  const handleSubmitComment = () => {
    setCanEdit(false);
    // setComment()
  };
  console.log('likes', likes);
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography sx={{ color: '#f9a825' }}>5.0</Typography>
        <Rating name="read-only" value={4} readOnly />
        <Typography color="textSecondary"> (15 รีวิว)</Typography>
      </Stack>
      <Paper elevation={2} sx={{ padding: '20px' }}>
        <Stack spacing={1}>
          <Stack
            direction="row"
            sx={{ paddingTop: '3px' }}
            justifyContent="space-evenly"
          >
            <Stack direction="row" spacing={1}>
              <Avatar
                alt="Remy Sharp"
                src="/assets/man.png"
                sx={{ width: 56, height: 56 }}
              />
              <Stack direction="column">
                <Typography variant="subtitle1">สมชาย ขายไก่</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  10 มกราคม 2565 12:12 น.
                </Typography>
              </Stack>
            </Stack>
            <Typography sx={{ ml: 'auto', mb: 'auto' }}>
              <PopperComment
                id={id}
                handleCanEdit={handleCanEdit}
                handleDelete={handleDelete}
              />
            </Typography>
          </Stack>
          <Divider />
          {canEdit ? (
            <Stack>
              <TextareaAutosize
                id="standard-basic"
                maxRows={7}
                minRows={7}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleSubmitComment}>Submit</Button>
            </Stack>
          ) : comment.length > 50 ? (
            <>
              {readMore ? (
                <>
                  <Typography
                    noWrap={false}
                    sx={{
                      wordWrap: 'break-word',
                    }}
                  >
                    {comment}
                    <HiddenAndShowButton
                      disableRipple
                      onClick={() => setReadMore(false)}
                    >
                      ซ่อน
                    </HiddenAndShowButton>
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">
                  <Typography>
                    {comment.substring(0, 100)}
                    <HiddenAndShowButton
                      disableRipple
                      onClick={() => setReadMore(true)}
                    >
                      ... อ่านเพิ่มเติม
                    </HiddenAndShowButton>{' '}
                  </Typography>
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography>{comment}</Typography>
            </>
          )}
          <Stack direction="row" alignItems="center">
            <Button
              onClick={handleOnclick}
              startIcon={
                <img
                  src={
                    like
                      ? '/assets/images/buddha_color.png'
                      : '/assets/images/buddha.png'
                  }
                  alt="likeIcon"
                  width={30}
                />
              }
              sx={{ color: 'blue' }}
            >
              Like
            </Button>
            {likes}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default Comment;
