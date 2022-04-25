import {
  Stack,
  TextareaAutosize,
  Paper,
  Typography,
  Divider,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useUser } from 'store/hooks/userHook';
import { ParentComment } from 'types/comment';
import ReplyIcon from '@mui/icons-material/Reply';
import { styled } from '@mui/styles';
import PopperComment from 'components/Popper/PopperComment';
import api from 'src/utils/api';
import { useLocation } from 'react-router-dom';

const HiddenAndShowButton = styled(Button)({
  paddingX: '4px',
  minWidth: 'min-content',
});

interface CommentProps {
  comment: ParentComment;
  fetchHandler: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, fetchHandler }) => {
  const { user } = useUser();
  const { pathname } = useLocation();
  const {
    id: commentId,
    visible,
    content: initialContent,
    owner,
    likes: initialLikes,
  } = comment;

  const [content, setContent] = useState<string>(initialContent);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const canEdit = owner.uid === user?.uid && isEditing;
  const blogId = pathname.split('/')[2];

  const decrementLikes = () => setLikes(likes - 1);
  const incrementLikes = () => setLikes(likes + 1);

  const handleLike = () => {
    setIsLiked((prevState) => {
      if (prevState) {
        decrementLikes();
        setIsLiked(false);
      } else if (!prevState) {
        incrementLikes();
        setIsLiked(true);
      }
      return !prevState;
    });
  };

  const handleCanEdit = () => {
    setIsEditing(true);
  };
  const handleDelete = async () => {
    const responseJson = await api<ParentComment>({
      url: `/blogs/${blogId}/comments/${commentId}`,
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    if (responseJson.status === 200) {
      fetchHandler();
    }
  };
  const handleHideComment = (id: string) => {
    console.log('hide comment');
  };

  const handleUpdateContent = async () => {
    const responseJson = await api<ParentComment>({
      url: `/blogs/${blogId}/comments/${commentId}`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      data: {
        content,
      },
    });

    if (responseJson.status === 200) {
      setIsEditing(false);
      fetchHandler();
    }
  };

  return (
    <Box>
      <Paper
        elevation={2}
        sx={{
          padding: '20px',
          backgroundColor: !visible ? '#bdbdbd' : '',
          color: !visible ? '#4b4949' : '',
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" sx={{ paddingTop: '3px' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ minWidth: '100%' }}
            >
              <Stack direction="row" spacing={1}>
                <Avatar
                  alt={owner.firstName}
                  src={owner.picture === null ? '' : owner.picture}
                  sx={{ width: 56, height: 56, opacity: !visible ? 0.2 : 1 }}
                />
                <Stack direction="column">
                  <Typography variant="subtitle1">
                    {owner.firstName} {owner.lastName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {new Date(comment.createAt).toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
              <Typography sx={{}}>
                <PopperComment
                  commentId={commentId}
                  handleCanEdit={handleCanEdit}
                  handleDelete={handleDelete}
                  handleHideComment={handleHideComment}
                />
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          {/* eslint-disable */}
          {canEdit ? (
            <Stack>
              <TextareaAutosize
                maxRows={7}
                minRows={7}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button onClick={handleUpdateContent}>ยืนยัน</Button>
            </Stack>
          ) : content.length > 50 ? (
            <>
              {readMore ? (
                <>
                  <Typography
                    noWrap={false}
                    sx={{
                      wordWrap: 'break-word',
                    }}
                  >
                    {content}
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
                    {content.substring(0, 100)}
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
            <Typography sx={{ color: !visible ? '#4b4949' : '' }}>
              {comment.content}
            </Typography>
          )}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Button
              onClick={handleLike}
              disabled={!visible}
              startIcon={
                <img
                  src={
                    isLiked
                      ? '/assets/images/buddha_color.png'
                      : '/assets/images/buddha.png'
                  }
                  alt="likeIcon"
                  width={30}
                />
              }
              sx={{ color: !visible ? '#4b4949' : 'red' }}
            >
              สาธุ
            </Button>
            {likes}
            <Button
              startIcon={<ReplyIcon />}
              // onClick={() => setReply(true)}
              sx={{ color: !visible ? '#4b4949' : 'primary' }}
              disabled={!visible}
            >
              reply
            </Button>
          </Stack>
          <>
            {/* {contentReply &&
              // eslint-disable-next-line @typescript-eslint/no-shadow
              contentReply.map((reply) => {
                return (
                  <CommentReply
                    id="1123123"
                    content={reply}
                    handleDelete={handleDelete}
                    decrementLikes={decrementLikes}
                    likes={likeReply}
                    incrementLikes={incrementLikes}
                  />
                );
              })} */}
          </>
          {/* {reply ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
                sx={{ width: 56, height: 56 }}
              />
              <TextareaAutosize
                id="standard-basic"
                maxRows={2}
                minRows={2}
                style={{ width: 500, fontSize: '16px' }}
                autoFocus
                value={contentReplyField}
                onChange={(e) => setContentReplyField(e.target.value)}
              />
              <Button onClick={handleReply}>Reply</Button>
            </Stack>
          ) : (
            <></>
          )} */}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Comment;
