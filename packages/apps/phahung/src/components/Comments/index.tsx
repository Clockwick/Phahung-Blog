import { CircularProgress } from '@mui/material';
import Comment from 'components/Comment';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'src/utils/api';
import { ParentComment } from 'types/comment';

const Comments = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [didFetchComments, setDidFetchComments] = useState<boolean>(false);
  const [comments, setComments] = useState<ParentComment[]>([]);

  const fetchComments = useCallback(async (): Promise<void> => {
    const url = `/blogs/${blogId}/comments`;
    const responseJson = await api<ParentComment[]>({
      url,
      method: 'GET',
    });
    setComments(responseJson.data);
  }, [blogId]);

  useEffect(() => {
    if (!didFetchComments) {
      fetchComments();
      setDidFetchComments(true);
    }
  }, [didFetchComments, fetchComments]);

  return didFetchComments && comments && comments.length > 0 ? (
    comments.map((comment) => <Comment key={comment.id} comment={comment} />)
  ) : (
    <CircularProgress />
  );
};

export default Comments;
