// import { Stack } from '@mui/material';
// // eslint-disable-next-line import/no-unresolved
// import SearchBar from 'components/SearchBar';
// import React from 'react';
// // eslint-disable-next-line import/no-unresolved
// import PopperBlog from 'components/Popper/PopperBlog';
// import { Link } from 'react-router-dom';
// import NavItems from 'components/NavItems';

// const Navbar: React.FC = () => {
//   return (
//     <Stack
//       direction="row"
//       justifyContent="space-between"
//       alignItems="center"
//       sx={{ height: '70px', backgroundColor: '#FFF7F2' }}
//     >
//       <Link href="/" to="/">
//         <img
//           src="/assets/images/logo.png"
//           width="60px"
//           height="60px"
//           alt="logo"
//         />
//       </Link>

//       <Stack direction="row" alignItems="center" sx={{ paddingRight: 4 }}>
//         <NavItems />
//         <SearchBar />
//         <PopperBlog />
//       </Stack>
//     </Stack>
//   );
// };

// export default Navbar;
/* eslint-disable */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchBar from 'components/SearchBar';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useUser } from 'store/hooks/userHook';
// const pages = ['Blog', 'Annoucement'];
// const settings = ['Profile', 'Logout'];

const Navbar = () => {
  const { isLoggedIn, logoutHandler } = useUser();
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
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logoutHandler();
    window.location.href = '/signin';
  };
  const path = window.location.pathname;
  console.log('path', path);

  return path !== '/signin' && path !== '/signup' ? (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#FFF7F2' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, px: 2 }}
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

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
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
                  }}
                >
                  Annoucement
                </Button>
              </Link>
            </Box>
            <SearchBar />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{}}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    onClick={handleOpenUserMenu}
                    spacing={0.5}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTc3MDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDk5NTczNjc&ixlib=rb-1.2.1&q=80&w=400"
                    />
                    <Typography sx={{ color: 'black' }}>
                      Pim Piyajiranan
                    </Typography>
                  </Stack>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="Profile"
                  onClick={handleCloseUserMenu}
                  sx={{ px: 5 }}
                >
                  <Link
                    to="/profile"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem
                  key="Logout"
                  onClick={handleCloseUserMenu}
                  sx={{ px: 5 }}
                >
                  <Typography textAlign="center" onClick={handleLogout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  ) : (
    <Box sx={{ height: '75px' }}></Box>
  );
};
export default Navbar;
