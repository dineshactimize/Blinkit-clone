import React, { useState, useEffect } from 'react';
import { 
    AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box, Button, Menu, MenuItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { getTotals } from '../../features/cart/cartSlice';
import { useNavigate, Link } from 'react-router-dom';

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
  
  // Safely access auth state
  const { user } = useSelector((state) => state.auth || {}); 
  const { cartTotalQuantity } = useSelector((state) => state.cart || { cartTotalQuantity: 0 });
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

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
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: '0px 1px 5px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ py: 1 }}>
        {/* LOGO */}
        <Typography 
            variant="h4" 
            component="div" 
            sx={{ fontWeight: 900, letterSpacing: '-1px', color: '#0c831f', cursor: 'pointer', mr: 4 }}
            onClick={() => navigate('/')}
        >
          blink<span style={{ color: '#f8cb46' }}>it</span>
        </Typography>

        {/* LOCATION HEADER (Desktop Only) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mr: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px', lineHeight: 1 }}>
                Delivery in 10 mins
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '12px', color: 'gray' }}>
                Mandapeta, Andhra Pradesh <KeyboardArrowDownIcon sx={{ fontSize: 14, verticalAlign: 'middle' }}/>
            </Typography>
        </Box>

        {/* SEARCH BAR */}
        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase placeholder='Search "milk"' inputProps={{ 'aria-label': 'search' }} />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* ACTIONS AREA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            
            {/* USER LOGIN / MENU LOGIC */}
            {user ? (
                <div>
                    <Button 
                        color="inherit" 
                        onClick={handleMenu} 
                        sx={{ textTransform: 'none', fontSize: '16px', fontWeight: 500 }}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        {user.name}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                                mt: 1.5,
                            },
                        }}
                    >
                        {/* 1. MY ORDERS OPTION */}
                        <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>
                            <ListItemIcon>
                                <ShoppingBagIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>My Orders</ListItemText>
                        </MenuItem>

                        {/* Optional: Keep Admin Panel if needed, otherwise remove */}
                        {user.isAdmin && (
                             <MenuItem onClick={() => { handleClose(); navigate('/admin/dashboard'); }}>
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="small" />
                                </ListItemIcon>
                                Admin Panel
                            </MenuItem>
                        )}

                        {/* 2. LOGOUT OPTION */}
                        <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </div>
            ) : (
                <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 'bold' }}>Login</Button>
            )}

            {/* CART BUTTON */}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/cart')} 
                startIcon={
                    <Badge badgeContent={cartTotalQuantity} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
                        <ShoppingCartIcon />
                    </Badge>
                }
                sx={{ 
                    borderRadius: '8px', 
                    py: 1.5, 
                    px: 3, 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    display: { xs: 'none', sm: 'flex'}
                }}
            >
                {cartTotalQuantity > 0 ? `${cartTotalQuantity} items` : 'My Cart'}
            </Button>
            
            {/* MOBILE CART ICON */}
            <IconButton 
                sx={{ display: { xs: 'flex', sm: 'none' } }}
                color="primary"
                onClick={() => navigate('/cart')}
            >
                 <Badge badgeContent={cartTotalQuantity} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;