/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useUser } from 'store/hooks/userHook';
import UserApiCall from '../api/user/userApiCall';
import '../styles/index.css';
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
} from '@mui/material';
import styled from '@emotion/styled';
import HelpIcon from '@mui/icons-material/Help';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import { BlogPreview as mockBlogPreview } from '../mocks/BlogPreview';
import type { BlogPreview } from '../types/blog';
import StackCard from '../components/StackCard/StackCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditOffIcon from '@mui/icons-material/EditOff';
import { User } from 'store/types';
import { someResponse } from '../types/someResponse';
import { isSomeResponse } from '../types/guard';

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

const Profile: React.FC = () => {
  const { user, isLoggedIn, fetchSessionHandler } = useUser();
  const [didFetchData, setDidFetchData] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState<BlogPreview[]>([]);
  const [cardPage, setCardPage] = useState<number>(0);
  const [userImage, setUserImage] = useState<string>('');
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

  useEffect(() => {
    if (!didFetchData) {
      fetchData();
    }
  }, [didFetchData]);

  const fetchData = async (): Promise<void> => {
    if (user && isLoggedIn) {
      setValues({
        ...values,
        firstName: {
          ...values['firstName'],
          value: user?.firstName || '',
        },
        lastName: {
          ...values['lastName'],
          value: user?.lastName || '',
        },
      });

      setUserImage(user.imageURL || '');
    }

    UserApiCall.getLikedBlogs().then((res) => {
      if (res.status === 200) {
        const responseData = res.data as BlogPreview[] | someResponse;
        if (isSomeResponse(responseData)) {
          console.log(responseData);
          alert('something went wrong');
        } else {
          console.log('getLikedBlogs', responseData);
          setDidFetchData(true);
          setLikedBlogs(responseData);
        }
      } else {
        console.error('res', res);
        alert('upload fail please try again later');
      }
    });

    // setLikedBlogs(mockBlogPreview);
    // setDidFetchData(true);
  };

  const uploadImg = (event: any) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('File', event.target.files[0]);

      UserApiCall.uploadImage(formData).then(async (res) => {
        if (res.status === 200) {
          const responseData = res.data as { url: string } | someResponse;
          if (isSomeResponse(responseData)) {
            console.log(responseData);
            alert('something went wrong');
          } else {
            await fetchSessionHandler();
            const urlImage: string = responseData.url;
            setUserImage(urlImage);
            alert('upload image success');
          }
        } else {
          console.error('res', res);
          alert('upload fail please try again later');
        }
      });
    }
  };

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user) {
      const payload: User = {
        uid: user.uid,
        email: user.email,
        imageURL: user.imageURL,
        role: user.role,
        isBan: user.isBan,
        likedBlogs: user.likedBlogs,
        firstName: values.firstName.value,
        lastName: values.lastName.value,
      };
      UserApiCall.updateUser(payload).then(async (res) => {
        if (res.status === 200) {
          const responseData = res.data as User | someResponse;
          if (isSomeResponse(responseData)) {
            console.log(responseData);
            alert('something went wrong');
          } else {
            setValues({
              ...values,
              firstName: {
                status: true,
                value: responseData.firstName,
              },
              lastName: {
                status: true,
                value: responseData.lastName,
              },
            });
            await fetchSessionHandler();
            alert('save success');
          }
        } else {
          console.log(res);
          alert('save fail please try again');
        }
      });
    } else {
      console.log("don't have user");
      alert('save fail please sign in');
    }
  };

  return (
    <Container>
      {isLoggedIn ? (
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
                  userImage
                    ? userImage
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMrO1TLWPlYMHdJw5GJV_p8f42t-aUUGlIJqNFnFZFw4OO8Nk5lpSHhzJ1n4g0E-9R-1I&usqp=CAU'
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
                          {values.firstName.status ? (
                            <CreateIcon />
                          ) : (
                            <EditOffIcon />
                          )}
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
                          {values.lastName.status ? (
                            <CreateIcon />
                          ) : (
                            <EditOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </Button>
            </Box>
          </Container>

          <Container sx={{ width: '100vw' }}>
            {didFetchData ? (
              likedBlogs.length ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
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
                <Box className="ErrorBox">
                  <Typography>คุณยังไม่ได้กดสาธุบล๊อคไหน</Typography>
                </Box>
              )
            ) : (
              <Box className="ErrorBox">
                <Loading />
              </Box>
            )}
          </Container>
        </Stack>
      ) : (
        <Box className="ErrorBox">
          <Typography>กรุณาล็อคอินเพื่อเข้าดูเนื้อหาในส่วนนี้</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
