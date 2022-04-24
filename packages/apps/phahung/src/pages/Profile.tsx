/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Typography,
  IconButton,
  FormHelperText,
  Container,
  Avatar,
  Badge,
  Box,
  Grid,
  CircularProgress as Loading,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import styled from '@emotion/styled';
import HelpIcon from '@mui/icons-material/Help';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import { BlogPreview as mockBlogPreview } from '../mocks/BlogPreview';
import type { BlogPreview } from '../types/blog';
import StackCard from '../components/StackCard/StackCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UserApiCall from '../api/user/userApiCall';

interface IValues {
  firstName: {
    value: string;
    status: boolean;
  };
  lastName: {
    value: string;
    status: boolean;
  };
}
const styles = {
  // tf: {
  //   width: '40vw',
  // },
  // cb: {
  //   height: '42px',
  // },
  upload: {
    width: '160px',
  },
  // create: {
  //   width: '120px',
  // },
  // stepperWrapper: {
  //   mt: 16,
  // },
};

const HiddenInput = styled('input')({
  display: 'none',
});

const UploadingImageDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget nunc congue, lobortis massa tincidunt, fermentum nisi. Suspendisse vel enim ut nisl aliquet semper a a velit. Donec luctus sem nulla, non ultrices eros elementum sed. Maecenas tempus hendrerit massa, ac viverra libero finibus sed. Donec a lorem nec tellus pharetra bibendum et a risus. Ut quis sem blandit justo posuere condimentum posuere ut risus. Nulla pharetra nulla non augue gravida, in suscipit nunc commodo. Vestibulum vulputate, nunc sed malesuada posuere, leo dui mattis ante, sodales varius metus eros sit amet diam. Curabitur non suscipit libero.
`;

const Profile: React.FC = () => {
  const [didFetchData, setDidFetchData] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState<BlogPreview[]>([]);
  const [cardPage, setCardPage] = useState<number>(0);
  const [newImg, setNewImg] = useState<string>('');
  const [values, setValues] = React.useState<IValues>({
    firstName: {
      value: 'พิม',
      status: true,
    },
    lastName: {
      value: 'ปิยจิรานันท์',
      status: true,
    },
  });

  const fetchData = async (): Promise<void> => {
    UserApiCall.getLikedBlogs().then((res) => {
      if (res.status === 200) {
        const responseData = res.data;
        console.log('getLikedBlogs', responseData);
        setLikedBlogs(responseData);
        setDidFetchData(true);
      }
    });

    // setLikedBlogs(mockBlogPreview);
    // setDidFetchData(true);
  };

  const uploadImg = (event: any) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('File', event.target.files[0]);

      UserApiCall.uploadImage(formData).then((res) => {
        if (res.status === 200) {
          const urlImage: string = res.data.url;
          setNewImg(urlImage);
          alert('upload image success');
        } else {
          console.error('res', res);
          alert('upload fail please try again later');
        }
      });
    }
  };

  useEffect(() => {
    if (!didFetchData) {
      fetchData();
    }
  }, [didFetchData, fetchData]);

  const handleChange =
    (prop: keyof IValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [prop]: {
          ...values[prop],
          value: event.target.value,
        },
      });
    };

  const handleClickStatus =
    (prop: keyof IValues, checked: boolean) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log('checked', checked);
      setValues({
        ...values,
        [prop]: {
          ...values[prop],
          status: !checked,
        },
      });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(firstName, lastName, picture, career, fileName, detail);
  };

  // const handleReset = () => {
  //   setFirstName('');
  //   setLastName('');
  //   setCareer('');
  //   setDetail('');
  //   setPicture('');
  //   setFileName('');
  // };
  const Input = styled('input')({
    display: 'none',
  });

  const getStack = (receivedBlogs: BlogPreview[], page: number) => {
    const chunkSize = 5;
    const chunkBlogs: BlogPreview[] = receivedBlogs.slice(
      page * chunkSize,
      page * chunkSize + chunkSize,
    );

    return <StackCard Blogs={chunkBlogs} />;
  };

  function changePageCard(direction: 'next' | 'prev') {
    const len = likedBlogs.length;
    console.log(cardPage, direction, len / 5);

    if (direction === 'next' && cardPage < Math.floor(len / 5)) {
      setCardPage(cardPage + 1);
    }
    if (direction === 'prev' && cardPage > 0) {
      setCardPage(cardPage - 1);
    }
  }

  return (
    <Stack>
      <Container
        sx={{
          display: 'flex',
          flexDirection: ['column', 'column', 'row', 'row', 'row'],
          justifyContent: 'center',
          alignItems: 'center',
          width: '70vw',
          height: '40vh',
          boxShadow: '3px 3px 6px #EEEEEE',
        }}
      >
        <Box
          sx={{
            width: ['100', '100', '50%', '50%', '50%'],
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            height="100%"
            src={
              newImg
                ? newImg
                : 'https://i0.wp.com/thainetizen.org/wp-content/uploads/2015/10/anonymous.jpg?fit=400%2C300&ssl=1'
            }
            alt="Logo"
            style={{
              objectFit: 'cover',
              overflow: 'hidden',
            }}
          />
        </Box>

        <IconButton
          size="large"
          component="label"
          sx={{
            position: 'relative',
            top: ['-5%', '-5%', '50%', '50%', '50%'],
            left: ['-5%', '-5%', '-25%', '-25%', '-25%'],

            backgroundColor: 'white',
            // border: '0.3px solid black',
            boxShadow: '2px 2px 4px #EEEEEE',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <AddPhotoAlternateIcon
            fontSize="large"
            sx={{ color: '#ff8a00', '&:hover': { opacity: 0.8 } }}
          />
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: 'none' }}
            hidden
            onChange={(e) => uploadImg(e)}
          />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5%',
            width: ['100', '100', '50%', '50%', '50%'],
            height: '100%',

            // backgroundColor: 'green',
          }}
        >
          <Box sx={{ display: 'flex', gap: '5%', alignItems: 'center' }}>
            <Typography>First Name</Typography>
            <FormControl
              variant="outlined"
              disabled={values.firstName.status}
              sx={{ width: '70%' }}
            >
              <InputLabel htmlFor="teacher-input-firstName" required>
                First Name
              </InputLabel>
              <OutlinedInput
                id="teacher-input-firstName"
                value={values.firstName.value}
                required
                label="First Name"
                onChange={handleChange('firstName')}
                inputProps={{
                  readOnly: values.firstName.status,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle edit firstName"
                      onClick={handleClickStatus(
                        'firstName',
                        values.firstName.status,
                      )}
                      edge="end"
                    >
                      {values.firstName.status ? <CreateIcon /> : <SaveIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '5%', alignItems: 'center' }}>
            <Typography>Last Name</Typography>
            <FormControl
              variant="outlined"
              disabled={values.lastName.status}
              sx={{ width: '70%' }}
            >
              <InputLabel htmlFor="teacher-input-lastName" required>
                Last Name
              </InputLabel>
              <OutlinedInput
                id="teacher-input-lastName"
                value={values.lastName.value}
                required
                label="Last Name"
                onChange={handleChange('lastName')}
                inputProps={{
                  readOnly: values.lastName.status,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle edit lastName"
                      onClick={handleClickStatus(
                        'lastName',
                        values.lastName.status,
                      )}
                      edge="end"
                    >
                      {values.lastName.status ? <CreateIcon /> : <SaveIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
      </Container>

      {/* Card */}
      <Container sx={{ width: '100vw' }}>
        {didFetchData ? (
          likedBlogs.length ? (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton
                size="large"
                sx={{
                  height: '10%',
                  zIndex: 100,
                  backgroundColor: 'white',
                  boxShadow: '3px 3px 5px #CCCCCC',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => changePageCard('prev')}
              >
                <ArrowBackIcon
                  fontSize="large"
                  sx={{
                    color: '#ff8a00',
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              </IconButton>

              {getStack(likedBlogs, cardPage)}

              <IconButton
                size="large"
                sx={{
                  height: '10%',
                  zIndex: 100,
                  backgroundColor: 'white',
                  boxShadow: '3px 3px 5px #CCCCCC',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => changePageCard('next')}
              >
                <ArrowForwardIcon
                  fontSize="large"
                  sx={{ color: '#ff8a00', '&:hover': { opacity: 0.8 } }}
                />
              </IconButton>
            </Stack>
          ) : (
            <Typography>คุณยังไม่ได้กดสาธุบล๊อคไหน</Typography>
          )
        ) : (
          <Loading />
        )}
      </Container>
    </Stack>
  );
};

export default Profile;
