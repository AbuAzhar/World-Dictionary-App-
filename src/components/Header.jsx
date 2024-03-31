import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';
import "../App.scss";
import Results from './Results';

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

export default function Header() {
    const [value, setValue] = React.useState();
    const submitHandler = (e) => {
        e.preventDefault();
        const forms = e.target;
        const  data = new FormData(forms);
        const newData = Object.fromEntries(data.entries());
        setValue(newData.word)
        forms.reset();

    }
  return (
    <>
    <Box sx={{ flexGrow: 1 }} className="Header" >
      <AppBar position="static" className="Header">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            className='Title'
          >
            WORLD DICTINORY 
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          <form onSubmit={submitHandler}>
          <StyledInputBase
              placeholder="Search Words..."
              type='text'
              name='word'
              inputProps={{ 'aria-label': 'search' }}
            //   value={search}
            //   onChange={handlerSearch}
            />
          </form>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
    <Results  Data={value} SetData={setValue}/>
    </>
  );
}
