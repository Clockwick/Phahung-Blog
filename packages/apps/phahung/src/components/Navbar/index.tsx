/* eslint-disable */
import React, { useContext } from 'react';
import SearchBar from 'components/SearchBar';
import { Link, useLocation, useHistory } from 'react-router-dom';
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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// const pages = ['Blog', 'Annoucement'];
// const settings = ['Profile', 'Logout'];

const Navbar = () => {
  const location = useLocation();
  const { push } = useHistory();
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
  const pathName = window.location.pathname;
  return location.pathname !== '/signin' && location.pathname !== '/signup' ? (
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
                    borderBottom:
                      location.pathname === '/' ? '2px solid #000' : 'none',
                    paddingBottom: '9px',
                    paddingX: '5px',
                    letterSpacing: '1.8px',
                    lineHeight: 1.08,
                  }}
                >
                  Blog
                </Button>
              </Link>
              {user && (
                <Link to="/announcement" style={{ textDecoration: 'none' }}>
                  <Button
                    key="Annoucement"
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'black',
                      display: 'block',
                      px: 3,
                      borderBottom:
                        location.pathname === '/announcement'
                          ? '2px solid #000'
                          : 'none',
                      paddingBottom: '9px',
                      letterSpacing: '2.0px',
                      lineHeight: 1.08,
                      paddingX: '4px',
                    }}
                  >
                    Announcement
                  </Button>
                </Link>
              )}
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              {pathName === '/' || pathName === '/announcement' ? (
                <SearchBar />
              ) : (
                <></>
              )}
              {user ? (
                <PopperBlog />
              ) : (
                <Link
                  href="/signin"
                  to="/signin"
                  style={{ textDecoration: 'none' }}
                >
                  <a>
                    <Button
                      variant="outlined"
                      startIcon={<PersonOutlineIcon />}
                    >
                      Sign In
                    </Button>
                  </a>
                </Link>
              )}
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
