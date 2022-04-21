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
import axios from 'axios';
import BlockCard from '../components/BlogCard/BlogCard';
import { BlogPreview as mockBlogPreview } from '../mocks/BlogPreview';
import type { BlogPreview } from '../types/blog';
import StackCard from '../components/StackCard/StackCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface IValues {
  firstName: {
    value: string;
    status: boolean;
  };
  lastName: {
    value: string;
    status: boolean;
  };
  career: {
    value: string;
    status: boolean;
  };
  picture: {
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

const ProfileSSS: React.FC = () => {
  const [values, setValues] = React.useState<IValues>({
    firstName: {
      value: 'พิม',
      status: true,
    },
    lastName: {
      value: 'ปิยจิรานันท์',
      status: true,
    },
    career: {
      value: 'นักศึกษา',
      status: true,
    },
    picture: {
      value: '',
      status: true,
    },
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setFileName(file.name);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       if (typeof reader.result === 'string') {
  //         setPicture(reader.result as string);
  //       }
  //     };
  //   }
  // };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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

  return (
    <Container sx={{ py: 3 }}>
      <Stack alignItems="center" spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
              sx={{ width: 200, height: 200, backgroundColor: 'blue' }}
            />
            <label
              htmlFor="icon-button-file"
              style={{
                marginTop: 'auto',
                marginRight: 'auto',
              }}
            >
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton aria-label="upload picture" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Stack>
          {/* <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<CreateIcon />}
          >
            <Avatar
              alt="Travis Howard"
              src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
              sx={{ width: 200, height: 200, my: 2 }}
            />
          </Badge> */}
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5.5}>
            <FormControl variant="outlined" disabled={values.firstName.status}>
              <InputLabel htmlFor="teacher-input-firstName" required>
                ชื่อจริง
              </InputLabel>
              <OutlinedInput
                id="teacher-input-firstName"
                value={values.firstName.value}
                required
                fullWidth
                onChange={handleChange('firstName')}
                inputProps={{
                  readOnly: values.firstName.status,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle edit name "
                      onClick={handleClickStatus(
                        'firstName',
                        values.firstName.status,
                      )}
                      edge="end"
                    >
                      {values.firstName.status ? <CreateIcon /> : <CheckIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="ชื่อจริง"
              />
              {/* <FormHelperText id="component-error-text">Error</FormHelperText> */}
            </FormControl>
            <FormControl variant="outlined" disabled={values.lastName.status}>
              <InputLabel htmlFor="teacher-input-lastName" required>
                นามสกุล
              </InputLabel>
              <OutlinedInput
                id="teacher-input-lastName"
                value={values.lastName.value}
                required
                fullWidth
                label="นามสกุล"
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
                      {values.lastName.status ? <CreateIcon /> : <CheckIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="outlined" disabled={values.career.status}>
              <InputLabel htmlFor="teacher-input-career" required>
                อาชีพ
              </InputLabel>
              <OutlinedInput
                id="teacher-input-career"
                value={values.career.value}
                required
                fullWidth
                label="อาชีพ"
                onChange={handleChange('career')}
                inputProps={{
                  readOnly: values.career.status,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle edit career"
                      onClick={handleClickStatus(
                        'career',
                        values.career.status,
                      )}
                      edge="end"
                    >
                      {values.career.status ? <CreateIcon /> : <CheckIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>อัพโหลดรูปภาพ</Typography>
                <IconButton color="primary" onClick={handleDialogOpen}>
                  <HelpIcon />
                </IconButton>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file-image">
                  <HiddenInput
                    accept="image/*"
                    id="contained-button-file-image"
                    type="file"
                    // onChange={handleFileUpload}
                  />
                  <Button
                    variant="contained"
                    sx={styles.upload}
                    component="span"
                  >
                    Choose file
                  </Button>
                </label>
                {fileName && <Typography>{fileName}</Typography>}
              </Stack>
            </Stack> */}
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

const Profile: React.FC = () => {
  const [didFetchData, setDidFetchData] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState<BlogPreview[]>([]);
  const [values, setValues] = React.useState<IValues>({
    firstName: {
      value: 'พิม',
      status: true,
    },
    lastName: {
      value: 'ปิยจิรานันท์',
      status: true,
    },
    career: {
      value: 'นักศึกษา',
      status: true,
    },
    picture: {
      value: '',
      status: true,
    },
  });
  const [cardPage, setCardPage] = useState<number>(0);

  const fetchData = async (): Promise<void> => {
    // axios
    //   .get('https://localhost:5001/blogs/3SvKPAotte5DsKqZXypK')
    //   .then((response) => {
    //     console.log('response: ', response);
    //     // do something about response
    //
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    setLikedBlogs(mockBlogPreview);
    setDidFetchData(true);
  };

  useEffect(() => {
    if (!didFetchData) {
      fetchData();
    }
  }, [didFetchData, fetchData]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
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

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setFileName(file.name);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       if (typeof reader.result === 'string') {
  //         setPicture(reader.result as string);
  //       }
  //     };
  //   }
  // };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
            src="https://images.unsplash.com/photo-1650343759375-aa845fda39a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Logo"
            style={{
              objectFit: 'cover',
              overflow: 'hidden',
            }}
          />
        </Box>

        <IconButton
          size="large"
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
        {didFetchData && likedBlogs ? (
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
          <Loading />
        )}
      </Container>
    </Stack>
  );
};

export default Profile;
