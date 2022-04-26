/* eslint-disable no-nested-ternary */
import {
  Typography,
  Stack,
  Rating,
  Paper,
  Button,
  Avatar,
  Divider,
  Box,
  Link,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import PopperComment from 'components/Popper/PopperComment';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ReplyIcon from '@mui/icons-material/Reply';
import { CommentOwner } from 'types/user';
import { SubComment } from 'types/comment';
import { useUser } from 'store/hooks/userHook';
import { useLocation } from 'react-router-dom';
import api from 'src/utils/api';

const HiddenAndShowButton = styled(Button)({
  paddingX: '4px',
  minWidth: 'min-content',
});

interface CommentReplyProps {
  comment: SubComment;
  parentRef: React.RefObject<HTMLDivElement>;
  fetchHandler: () => void;
}

const CommentReply: React.FC<CommentReplyProps> = ({
  comment,
  parentRef,
  fetchHandler,
}) => {
  const { user } = useUser();
  const { pathname } = useLocation();
  const {
    id: commentId,
    visible,
    content: initialContent,
    owner,
    likes: initialLikes,
    parentId,
    parentOwner,
  } = comment;

  const [content, setContent] = useState<string>(initialContent);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>('');

  const canEdit = owner.uid === user?.uid && isEditing;
  const blogId = pathname.split('/')[2];

  const decrementLikes = async () => {
    setLikes(likes - 1);
    const response = await api({
      url: `/blogs/${blogId}/comments/${parentId}/subcomment/${commentId}/dislike`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    console.log(response);
  };
  const incrementLikes = async () => {
    setLikes(likes + 1);
    console.log(
      `/blogs/${blogId}/comments/${parentId}/subcomment/${commentId}/like`,
    );
    const response = await api({
      url: `/blogs/${blogId}/comments/${parentId}/subcomment/${commentId}/like`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    console.log(response);
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

  const scrollToParent = () => {
    if (parentRef.current) {
      parentRef?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleCanEdit = () => {
    setIsEditing(true);
  };
  // const handleDelete = async () => {
  //   const responseJson = await api<ParentComment>({
  //     url: `/blogs/${blogId}/comments/${commentId}`,
  //     method: 'DELETE',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('idToken')}`,
  //     },
  //   });
  //   if (responseJson.status === 200) {
  //     fetchHandler();
  //   }
  // };

  const handleHideComment = (id: string) => {
    console.log('hide comment');
  };

  // const handleUpdateContent = async () => {
  //   const responseJson = await api<ParentComment>({
  //     url: `/blogs/${blogId}/comments/${commentId}`,
  //     method: 'PUT',
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('idToken')}`,
  //     },
  //     data: {
  //       content,
  //     },
  //   });

  //   if (responseJson.status === 200) {
  //     setIsEditing(false);
  //     fetchHandler();
  //   }
  // };

  const handleReply = async () => {
    const response = await api({
      url: `/blogs/${blogId}/comments/${parentId}/subcomment`,
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

  const handleOnClickReply = () => {
    setIsReplying(true);
  };

  // console.log(commentId, comments);

  return (
    <Box>
      <Box
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
                {/* <PopperComment
                  commentId={commentId}
                  handleCanEdit={handleCanEdit}
                  // handleDelete={handleDelete}
                  handleHideComment={handleHideComment}
                /> */}
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
              {/* <Button onClick={handleUpdateContent}>ยืนยัน</Button> */}
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
              <Link onClick={() => scrollToParent()} sx={{ cursor: 'pointer' }}>
                @{parentOwner.firstName} {parentOwner.lastName}
              </Link>{' '}
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
              onClick={handleOnClickReply}
              sx={{ color: !visible ? '#4b4949' : 'primary' }}
              disabled={!visible}
            >
              reply
            </Button>
          </Stack>
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
      </Box>
    </Box>
  );
};

export default CommentReply;
