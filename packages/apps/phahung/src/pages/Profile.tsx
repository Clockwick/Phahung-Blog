/* eslint-disable */
import React, { useState } from 'react';
import {
  Stack,
  Button,
  Typography,
  IconButton,
  FormHelperText,
  Container,
  Avatar,
} from '@mui/material';

import styled from '@emotion/styled';
import HelpIcon from '@mui/icons-material/Help';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
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

const Profile: React.FC = () => {
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
    <Container>
      <Stack alignItems="center" spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton aria-label="upload picture" component="span">
              <CreateIcon />
            </IconButton>
          </label>
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

export default Profile;
