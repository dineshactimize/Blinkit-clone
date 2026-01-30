// ... existing imports ...
import React, { useState } from 'react';
import { 
    AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box, Button, Menu, MenuItem 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

// ... Keep your Search/InputBase styles exactly as they were ...
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  backgroundColor: '#f8f8f8',
  '&:hover': { backgroundColor: '#f0f0f0' },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  border: '1px solid #e0e0e0',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '50ch' },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ py: 1, minHeight: '70px' }}>
        {/* LOGO */}
        <Typography 
            variant="h4" 
            component="div" 
            sx={{ fontWeight: 900, letterSpacing: '-1px', color: '#0c831f', cursor: 'pointer', mr: 4 }}
            onClick={() => navigate('/')}
        >
          blink<span style={{ color: '#f8cb46' }}>it</span>
        </Typography>

        {/* LOCATION */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mr: 4, cursor: 'pointer' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px', lineHeight: 1.2 }}>
                Delivery in 10 mins
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '13px', color: '#666' }}>
                Andhra Pradesh, India <KeyboardArrowDownIcon sx={{ fontSize: 16, verticalAlign: 'middle' }}/>
            </Typography>
        </Box>

        {/* SEARCH */}
        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase placeholder='Search "milk"' inputProps={{ 'aria-label': 'search' }} />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* LOGIN LOGIC - NOW EXPLICIT */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {!user ? (
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/login" 
                    sx={{ textDecoration: 'none', color: '#333', fontSize: '18px', cursor: 'pointer' }}
                >
                    Login
                </Typography>
            ) : (
                <>
                    <Button color="inherit" onClick={handleMenu} sx={{ textTransform: 'none', fontSize: '16px' }}>
                        {user.name}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </Menu>
                </>
            )}

            {/* CART BUTTON */}
            <Button 
                variant="contained" 
                color="success" 
                startIcon={<ShoppingCartIcon />}
                sx={{ 
                    bgcolor: '#0c831f',
                    borderRadius: '8px', 
                    py: 1.5, 
                    px: 3, 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    display: { xs: 'none', sm: 'flex'}
                }}
            >
                My Cart
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;