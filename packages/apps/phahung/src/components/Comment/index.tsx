import {
  Typography,
  Stack,
  Rating,
  Paper,
  Container,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const HiddenAndShowButton = styled(Button)({
  paddingX: '4px',
  minWidth: 'min-content',
});

const Comment = () => {
  const data =
    'lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aperiam nisi praesentium soluta repellendus quas enimconsequatur deleniti veritatis repellat, recusandae, delectus,rerum aliquam? Quia repellat similique nostrum doloribus';

  const [readMore, setReadMore] = useState(false);
  const [like, setLike] = useState(false);
  const handleOnclick = () => {
    setLike((prevState) => !like);
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        รีวิวจากผู้อ่าน
      </Typography>
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
            <MoreHorizIcon sx={{ ml: 'auto' }} />
          </Stack>
          <Divider />
          <Typography variant="body1">
            {readMore ? (
              <>
                <Typography>
                  {data}
                  <HiddenAndShowButton
                    disableRipple
                    onClick={() => setReadMore(false)}
                  >
                    ซ่อน
                  </HiddenAndShowButton>
                </Typography>
              </>
            ) : (
              <>
                <Typography>
                  {data.substring(0, 100)}
                  <HiddenAndShowButton
                    disableRipple
                    onClick={() => setReadMore(true)}
                  >
                    ... อ่านเพิ่มเติม
                  </HiddenAndShowButton>{' '}
                </Typography>
              </>
            )}
          </Typography>
          {/* <Rating name="read-only" value={4} readOnly /> */}
          <Stack direction="row" alignItems="center">
            <Button
              onClick={handleOnclick}
              startIcon={like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              sx={{ color: 'blue' }}
            >
              Like
            </Button>
            13.1k
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Comment;
