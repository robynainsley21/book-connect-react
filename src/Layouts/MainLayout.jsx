import HomePage from "../pages/Home";
import { useState } from "react";

//MUI components
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const MainLayout = () => {
 
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <a className="logo" href="/">
            <i className="fa-solid fa-b fa-3x"></i>
          </a>
          <p className="logo-name">Book Connect</p>
        </div>
        <div>

          <div className="settings">
          <Search>
            <SearchIconWrapper>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <button className="settings-item">
              <i className="fa-solid fa-user fa-2x"></i>
            </button>
          </div>
        </div>
      </nav>
      <HomePage />
    </>
  );
};

export default MainLayout;
