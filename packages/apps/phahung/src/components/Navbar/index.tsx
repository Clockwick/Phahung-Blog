/* eslint-disable */
import React, { useContext } from 'react';
import SearchBar from 'components/SearchBar';
import { Link } from 'react-router-dom';
import {
  Stack,
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { useUser } from 'store/hooks/userHook';
import PopperBlog from 'components/Popper/PopperBlog';
import { SearchContext } from 'src/contexts/SearchContext';
// const pages = ['Blog', 'Annoucement'];
// const settings = ['Profile', 'Logout'];

const Navbar = () => {
  const { user, isLoggedIn, logoutHandler } = useUser();
  const { setInputSearch } = useContext(SearchContext);
  const [anchorElNav, setAnchorElNav] =
    React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setInputSearch('');
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const handleLogout = () => {
    logoutHandler();
    window.location.href = '/signin';
  };
  const path = window.location.pathname;
  // console.log('path', path);
  // console.log('user', user);
  return path !== '/signin' && path !== '/signup' ? (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#FFF7F2', mb: 5, width: '100vw' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, pr: 2 }}
              onClick={() => setInputSearch('')}
            >
              <Link href="/" to="/">
                <img
                  src="/assets/images/logo.png"
                  width="60px"
                  height="65px"
                  alt="logo"
                />
              </Link>
            </Typography>

            <Stack
              sx={{
                flexGrow: 1,
                display: { md: 'flex' },
              }}
              direction="row"
              spacing={3}
            >
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                  key="Blog"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    px: 3.5,
                    borderBottom: path === '/' ? '2px solid #000' : 'none',
                    paddingBottom: '9px',
                    paddingX: '5px',
                    letterSpacing: '1.8px',
                    lineHeight: 1.08,
                  }}
                >
                  Blog
                </Button>
              </Link>
              <Link to="/annoucement" style={{ textDecoration: 'none' }}>
                <Button
                  key="Annoucement"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    px: 3,
                    borderBottom:
                      path === '/annoucement' ? '2px solid #000' : 'none',
                    paddingBottom: '9px',
                    letterSpacing: '2.0px',
                    lineHeight: 1.08,
                    paddingX: '4px',
                  }}
                >
                  Announcement
                </Button>
              </Link>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <SearchBar />
              <PopperBlog />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  ) : (
    <Box sx={{ height: '75px' }}></Box>
  );
};
export default Navbar;
