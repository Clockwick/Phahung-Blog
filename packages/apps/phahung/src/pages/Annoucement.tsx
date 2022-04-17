import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';

const Annoucement = () => {
  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
            sx={{ width: 56, height: 56 }}
          />
          <Stack spacing={1}>
            <Typography variant="h5">
              ประกาศเรื่องขอปรับขึ้นค่าบริการ
            </Typography>
            <Typography variant="subtitle1">
              เนื่องจากทางเรามีค่าใช้จ่ายเพิ่มเติมในส่วนของตัวเว็บ
              จึงขออนุญาติปรับขึ้นราคาในการสมัครสมาชิก จาก 100 เป็น 250 บาท
              เนื่องจากทางเรามีค่าใช้จ่ายเพิ่มเติมในส่วนของตัวเว็บ
              จึงขออนุญาติปรับขึ้นราคาในการสมัครสมาชิก จาก 100 เป็น 250 บาท
              เนื่องจากทางเรามีค่าใช้จ่ายเพิ่มเติมในส่วนของตัวเว็บ
              จึงขออนุญาติปรับขึ้นราคาในการสมัครสมาชิก จาก 100 เป็น 250 บาท
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="h6" sx={{ mt: 'auto' }}>
            Posted on
          </Typography>
          <Typography variant="subtitle1">Apr 3,2022 at 2:46pm</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderBottom: '1.5px solid #bdbdbd', py: 1 }} />
    </Container>
  );
};

export default Annoucement;
