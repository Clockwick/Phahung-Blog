// /* eslint-disable no-nested-ternary */
// import {
//   Typography,
//   Stack,
//   Paper,
//   Button,
//   Avatar,
//   Divider,
//   Container,
// } from '@mui/material';
// import { styled } from '@mui/styles';
// import React, { useState } from 'react';
// // eslint-disable-next-line import/no-unresolved
// import PopperComment from 'components/Popper/PopperComment';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import ReplyIcon from '@mui/icons-material/Reply';
// // eslint-disable-next-line import/no-unresolved
// import CommentReply from 'components/CommentReply';

// const HiddenAndShowButton = styled(Button)({
//   paddingX: '4px',
//   minWidth: 'min-content',
// });

// interface IComment {
//   id: string;
//   content: string;
//   likes: number;
//   hide: boolean;
//   handleDelete: (id: string) => void;
//   decrementLikes: (id: string) => void;
//   incrementLikes: (id: string) => void;
//   handleHideComment: (id: string) => void;
// }

// const Comment: React.FC<IComment> = ({
//   id,
//   content,
//   likes,
//   handleDelete,
//   decrementLikes,
//   incrementLikes,
//   handleHideComment,
//   hide,
// }) => {
//   const [readMore, setReadMore] = useState<boolean>(false);
//   const [like, setLike] = useState<boolean>(false);
//   const [canEdit, setCanEdit] = useState<boolean>(false);
//   const [comment, setComment] = useState<string>(content);
//   const [reply, setReply] = useState<boolean>(false);
//   const [contentReplyField, setContentReplyField] = useState<string>('');
//   const [contentReply, setContentReply] = useState<string[]>([]);
//   const [isLikeReply, setIsLikeReply] = useState<boolean>(false);
//   const [likeReply, setLikeReply] = useState<number>(0);

//   const handleCanEdit = (): void => {
//     setCanEdit(true);
//   };
//   const handleOnclick = () => {
//     setLike((prevState) => {
//       if (prevState) {
//         decrementLikes(id);
//         setLike(false);
//       } else if (!prevState) {
//         incrementLikes(id);
//         setLike(true);
//       }
//       return !prevState;
//     });
//   };

//   const handleSubmitComment = () => {
//     setCanEdit(false);
//     // setComment()
//   };

//   const handleReply = () => {
//     setReply(false);
//     setContentReply([...contentReply, contentReplyField]);
//     setContentReplyField('');
//   };

//   return (
//     <Container>
//       <Stack direction="row" spacing={1}>
//         {/* <Typography sx={{ color: '#f9a825' }}>5.0</Typography> */}
//         {/* <Rating name="read-only" value={4} readOnly />
//         <Typography color="textSecondary"> (15 รีวิว)</Typography> */}
//       </Stack>
//       <Paper
//         elevation={2}
//         sx={{
//           padding: '20px',
//           backgroundColor: hide ? '#bdbdbd' : '',
//           color: hide ? '#4b4949' : '',
//         }}
//       >
//         <Stack spacing={1}>
//           <Stack
//             direction="row"
//             sx={{ paddingTop: '3px' }}
//             // justifyContent="space-evenly"
//           >
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               sx={{ minWidth: '100%' }}
//             >
//               <Stack direction="row" spacing={1}>
//                 <Avatar
//                   alt="Remy Sharp"
//                   src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
//                   sx={{ width: 56, height: 56, opacity: hide ? 0.2 : 1 }}
//                 />
//                 <Stack direction="column">
//                   <Typography variant="subtitle1">สมชาย ขายไก่</Typography>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     10 มกราคม 2565 12:12 น.
//                   </Typography>
//                 </Stack>
//               </Stack>
//               <Typography sx={{}}>
//                 <PopperComment
//                   id={id}
//                   handleCanEdit={handleCanEdit}
//                   handleDelete={handleDelete}
//                   handleHideComment={handleHideComment}
//                 />
//               </Typography>
//             </Stack>
//           </Stack>
//           <Divider />
//           {canEdit ? (
//             <Stack>
//               <TextareaAutosize
//                 id="standard-basic"
//                 maxRows={7}
//                 minRows={7}
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <Button onClick={handleSubmitComment}>Submit</Button>
//             </Stack>
//           ) : comment.length > 50 ? (
//             <>
//               {readMore ? (
//                 <>
//                   <Typography
//                     noWrap={false}
//                     sx={{
//                       wordWrap: 'break-word',
//                     }}
//                   >
//                     {comment}
//                     <HiddenAndShowButton
//                       disableRipple
//                       onClick={() => setReadMore(false)}
//                     >
//                       ซ่อน
//                     </HiddenAndShowButton>
//                   </Typography>
//                 </>
//               ) : (
//                 <Typography variant="body1">
//                   <Typography>
//                     {comment.substring(0, 100)}
//                     <HiddenAndShowButton
//                       disableRipple
//                       onClick={() => setReadMore(true)}
//                     >
//                       ... อ่านเพิ่มเติม
//                     </HiddenAndShowButton>{' '}
//                   </Typography>
//                 </Typography>
//               )}
//             </>
//           ) : (
//             <>
//               <Typography sx={{ color: hide ? '#4b4949' : '' }}>
//                 {comment}
//               </Typography>
//             </>
//           )}
//           <Stack direction="row" alignItems="center" spacing={1.5}>
//             <Button
//               onClick={handleOnclick}
//               disabled={hide}
//               startIcon={
//                 <img
//                   src={
//                     like
//                       ? '/assets/images/buddha_color.png'
//                       : '/assets/images/buddha.png'
//                   }
//                   alt="likeIcon"
//                   width={30}
//                 />
//               }
//               sx={{ color: hide ? '#4b4949' : 'red' }}
//             >
//               สาธุ
//             </Button>
//             {likes}
//             <Button
//               startIcon={<ReplyIcon />}
//               onClick={() => setReply(true)}
//               sx={{ color: hide ? '#4b4949' : 'primary' }}
//               disabled={hide}
//             >
//               reply
//             </Button>
//           </Stack>
//           <>
//             {contentReply &&
//               // eslint-disable-next-line @typescript-eslint/no-shadow
//               contentReply.map((reply) => {
//                 return (
//                   <CommentReply
//                     id="1123123"
//                     content={reply}
//                     handleDelete={handleDelete}
//                     decrementLikes={decrementLikes}
//                     likes={likeReply}
//                     incrementLikes={incrementLikes}
//                   />
//                 );
//               })}
//           </>
//           {reply ? (
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar
//                 alt="Remy Sharp"
//                 src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
//                 sx={{ width: 56, height: 56 }}
//               />
//               <TextareaAutosize
//                 id="standard-basic"
//                 maxRows={2}
//                 minRows={2}
//                 style={{ width: 500, fontSize: '16px' }}
//                 autoFocus
//                 value={contentReplyField}
//                 onChange={(e) => setContentReplyField(e.target.value)}
//               />
//               <Button onClick={handleReply}>Reply</Button>
//             </Stack>
//           ) : (
//             <></>
//           )}
//         </Stack>
//       </Paper>
//     </Container>
//   );
// };

// export default Comment;
