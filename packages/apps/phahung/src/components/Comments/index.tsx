import Comment from 'components/Comment';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'src/utils/api';
import { ParentComment } from 'types/comment';
import {
  Button,
  Stack,
  Typography,
  CircularProgress as Loading,
  TextareaAutosize,
  Link,
} from '@mui/material';
import { useUser } from 'store/hooks/userHook';

const Comments = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const { user } = useUser();
  const [didFetchComments, setDidFetchComments] = useState<boolean>(false);
  const [comments, setComments] = useState<ParentComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isCreatingComment, setIsCreatingComment] = useState<boolean>(false);
  const { isLoggedIn } = useUser();

  const fetchComments = useCallback(async (): Promise<void> => {
    const url = `/blogs/${blogId}/comments`;
    const responseJson = await api<ParentComment[]>({
      url,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    if (responseJson.status === 200) {
      setComments(responseJson.data);
    }
  }, [blogId]);

  const handleCreateComment = async () => {
    // setDidFetchComment(true);
    // await axios.post
    setIsCreatingComment(true);
    const responseJson = await api<ParentComment>({
      method: 'POST',
      url: `/blogs/${blogId}/comments`,
      data: {
        content: newComment,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
    if (responseJson.status === 201) {
      setNewComment('');
      setDidFetchComments(false);
      setIsCreatingComment(false);
    }
  };
  useEffect(() => {
    if (!didFetchComments) {
      fetchComments();
      setDidFetchComments(true);
    }
  }, [didFetchComments, fetchComments]);

  const fetchHandler = () => setDidFetchComments(false);

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        แสดงความคิดเห็น
      </Typography>
      {isLoggedIn ? (
        <Stack alignItems="end" spacing={3}>
          <TextareaAutosize
            maxRows={10}
            minRows={10}
            placeholder="ใส่ความคิดเห็นที่นี่"
            style={{ width: '100%', resize: 'none' }}
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Button
            variant="contained"
            sx={{ float: 'right' }}
            onClick={handleCreateComment}
          >
            {isCreatingComment ? (
              <Loading size={20} sx={{ color: 'white' }} />
            ) : (
              'เพิ่มความคิดเห็น'
            )}
          </Button>
        </Stack>
      ) : (
        <Typography>
          กรุณา<Link href="/signin">เข้าสู่ระบบ</Link>เพื่อแสดงความคิดเห็น
        </Typography>
      )}
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        รีวิวจากผู้อ่าน
      </Typography>
      {/* eslint-disable */}
      {didFetchComments ? (
        comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              fetchHandler={fetchHandler}
            />
          ))
        ) : (
          <Typography>ยังไม่มีรีวิวจากผู้อ่าน</Typography>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Comments;
