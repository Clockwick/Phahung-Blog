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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from 'store/hooks/userHook';
import { ParentComment } from 'types/comment';
import ReplyIcon from '@mui/icons-material/Reply';
import { styled } from '@mui/styles';
import PopperComment from 'components/Popper/PopperComment';
import api from 'src/utils/api';
import { useLocation } from 'react-router-dom';
import CommentReply from 'components/CommentReply';

const HiddenAndShowButton = styled(Button)({
  paddingX: '4px',
  minWidth: 'min-content',
});

interface CommentProps {
  comment: ParentComment;
  fetchHandler: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, fetchHandler }) => {
  const { user, fetchSessionHandler, isLoggedIn } = useUser();
  const { pathname } = useLocation();
  const {
    id: commentId,
    visible,
    content: initialContent,
    owner,
    likes: initialLikes,
    comments,
  } = comment;
  const [content, setContent] = useState<string>(initialContent);
  const [readMore, setReadMore] = useState<boolean>(false);
  const initialIsLiked = user
    ? !!user.likedComments.find(
        (likedCommentId) => likedCommentId === commentId,
      )
    : false;
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');
  const [disabledLike, setDisabledLike] = useState<boolean>(false);
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const isOwner = useMemo(() => user?.uid === owner.uid, [user, owner]);
  const isAdmin = useMemo(() => user?.role === 0, [user]);
  const canEdit = owner.uid === user?.uid && isEditing;
  const blogId = pathname.split('/')[2];

  const decrementLikes = async () => {
    setDisabledLike(true);
    const response = await api({
      url: `/blogs/${blogId}/comments/${commentId}/dislike`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    if (response.status === 200) {
      fetchSessionHandler();
    }
    setLikes(likes - 1);
    setDisabledLike(false);
  };
  const incrementLikes = async () => {
    setDisabledLike(true);
    const response = await api({
      url: `/blogs/${blogId}/comments/${commentId}/like`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    if (response.status === 200) {
      fetchSessionHandler();
    }
    setLikes(likes + 1);
    setDisabledLike(false);
  };

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

  const handleHideComment = async () => {
    const responseJson = await api<ParentComment>({
      url: `/blogs/${blogId}/comments/${commentId}/hide`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      data: {
        visible,
      },
    });
    if (responseJson.status === 200) {
      fetchHandler();
    }
  };
  const handleUnHideComment = async () => {
    const responseJson = await api<ParentComment>({
      url: `/blogs/${blogId}/comments/${commentId}/show`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      data: {
        visible,
      },
    });
    if (responseJson.status === 200) {
      fetchHandler();
    }
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

  const handleReply = async () => {
    const response = await api({
      url: `/blogs/${blogId}/comments/${commentId}/subcomment`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      data: {
        content: replyContent,
        parentOwner: {
          uid: owner.uid,
          firstName: owner.firstName,
          lastName: owner.lastName,
          picture: owner.picture,
        },
      },
    });
    if (response.status === 201) {
      fetchHandler();
      setIsReplying(false);
    }
  };

  const handleBanUser = async () => {
    const response = await api({
      url: `/users/${owner.uid}/ban`,
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    if (response.status === 200) {
      setIsBanned(true);
      await new Promise<void>((done) => setTimeout(() => done(), 3000));
      fetchHandler();
    }
  };

  const handleOnClickReply = () => {
    setIsReplying(true);
  };

  const paperColor = (): string => {
    if (!visible) {
      return '#bdbdbd';
    }
    if (isBanned) {
      return 'red';
    }
    return '';
  };

  return (
    <Box>
      <Paper
        elevation={2}
        sx={{
          padding: '20px',
          backgroundColor: paperColor(),
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
                <Stack direction="column" ref={commentRef}>
                  <Typography variant="subtitle1">
                    {owner.firstName} {owner.lastName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {new Date(comment.createAt).toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
              {(isOwner || isAdmin) && (
                <PopperComment
                  isOwner={isOwner}
                  visible={visible}
                  handleCanEdit={handleCanEdit}
                  handleDelete={handleDelete}
                  handleHideComment={handleHideComment}
                  handleUnHideComment={handleUnHideComment}
                  handleBanUser={handleBanUser}
                />
              )}
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
          {isLoggedIn ? (
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Button
                onClick={handleLike}
                disabled={!visible || disabledLike}
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
              <Typography color={disabledLike ? 'grey.500' : 'inherit'}>
                {likes}
              </Typography>
              <Button
                startIcon={<ReplyIcon />}
                onClick={handleOnClickReply}
                sx={{ color: !visible ? '#4b4949' : 'primary' }}
                disabled={!visible}
              >
                reply
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center">
              <Button
                disabled
                startIcon={
                  <img
                    src="/assets/images/buddha.png"
                    alt="likeIcon"
                    width={30}
                  />
                }
                sx={{ color: 'black' }}
              >
                {likes} สาธุ
              </Button>
            </Stack>
          )}

          <>
            {comments.map((comment) => {
              return (
                <CommentReply
                  key={comment.id}
                  comment={comment}
                  parentRef={commentRef}
                  fetchHandler={fetchHandler}
                />
              );
            })}
          </>
          {isReplying ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
                sx={{ width: 56, height: 56 }}
              />
              <TextareaAutosize
                maxRows={2}
                minRows={2}
                style={{ width: 500, fontSize: '16px' }}
                autoFocus
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <Button onClick={handleReply}>ตอบกลับ</Button>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Comment;
