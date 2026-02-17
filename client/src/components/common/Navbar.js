import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box, Button,
    Menu, MenuItem, ListItemIcon, ListItemText, Drawer, List, ListItem,
    ListItemButton, Divider, Avatar, useMediaQuery, useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync, reset } from '../../features/auth/authSlice';
import { getTotals } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

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
    [theme.breakpoints.down('md')]: { display: 'none' },
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
        [theme.breakpoints.up('md')]: { width: '40ch' },
    },
}));

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { user } = useSelector((state) => state.auth || {});
    const { cartTotalQuantity } = useSelector((state) => state.cart || { cartTotalQuantity: 0 });
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const onLogout = () => {
        dispatch(logoutAsync());
        dispatch(reset());
        handleClose();
        setMobileOpen(false);
        navigate('/login');
    };

    const drawerContent = (
        <Box sx={{ width: 280 }} role="presentation">
            <Box sx={{ p: 3, bgcolor: '#f8f8f8', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#0c831f' }}>
                    {user && user.name ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
                </Avatar>
                <Box>
                    {user ? (
                        <>
                            <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                        </>
                    ) : (
                        <Button variant="outlined" size="small" onClick={() => { navigate('/login'); setMobileOpen(false); }}>
                            Login / Sign Up
                        </Button>
                    )}
                </Box>
            </Box>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => { navigate('/'); setMobileOpen(false); }}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                {user && (
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { navigate('/orders'); setMobileOpen(false); }}>
                            <ListItemIcon><ShoppingBagIcon /></ListItemIcon>
                            <ListItemText primary="My Orders" />
                        </ListItemButton>
                    </ListItem>
                )}

                <ListItem disablePadding>
                    <ListItemButton onClick={() => { navigate('/cart'); setMobileOpen(false); }}>
                        <ListItemIcon>
                            <Badge badgeContent={cartTotalQuantity} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="My Cart" />
                    </ListItemButton>
                </ListItem>

                {user && user.isAdmin && (
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { navigate('/admin/dashboard'); setMobileOpen(false); }}>
                            <ListItemIcon><AdminPanelSettingsIcon color="warning" /></ListItemIcon>
                            <ListItemText primary="Admin Panel" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

            <Divider />

            {user && (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={onLogout}>
                            <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                            <ListItemText primary="Logout" primaryTypographyProps={{ color: 'error' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            )}
        </Box>
    );

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: '0px 1px 5px rgba(0,0,0,0.05)' }}>
            <Toolbar sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        fontWeight: 900,
                        letterSpacing: '-1px',
                        color: '#0c831f',
                        cursor: 'pointer',
                        mr: { xs: 0, md: 4 },
                        fontSize: { xs: '24px', md: '34px' }
                    }}
                    onClick={() => navigate('/')}
                >
                    blink<span style={{ color: '#f8cb46' }}>it</span>
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mr: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px', lineHeight: 1 }}>
                        Delivery in 10 mins
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '12px', color: 'gray' }}>
                        Mandapeta, Andhra Pradesh
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 1, maxWidth: '600px' }}>
                    <Search sx={{ m: 0, width: '100% !important' }}>
                        <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                        <StyledInputBase placeholder='Search "milk"' inputProps={{ 'aria-label': 'search' }} fullWidth />
                    </Search>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
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
                                <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>
                                    <ListItemIcon><ShoppingBagIcon fontSize="small" /></ListItemIcon>
                                    My Orders
                                </MenuItem>

                                {user.isAdmin && (
                                    <MenuItem onClick={() => { handleClose(); navigate('/admin/dashboard'); }}>
                                        <ListItemIcon><AdminPanelSettingsIcon fontSize="small" /></ListItemIcon>
                                        Admin Panel
                                    </MenuItem>
                                )}

                                <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
                                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 'bold' }}>Login</Button>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/cart')}
                        startIcon={
                            <Badge badgeContent={cartTotalQuantity} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        }
                        sx={{ borderRadius: '8px', py: 1.5, px: 3, fontWeight: 'bold', textTransform: 'none' }}
                    >
                        {cartTotalQuantity > 0 ? `${cartTotalQuantity} items` : 'My Cart'}
                    </Button>
                </Box>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton color="inherit" sx={{ mr: 1 }}>
                        <SearchIcon />
                    </IconButton>

                    <IconButton color="primary" onClick={() => navigate('/cart')}>
                        <Badge badgeContent={cartTotalQuantity} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>

            </Toolbar>

            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
            >
                {drawerContent}
            </Drawer>

        </AppBar>
    );
};

export default Navbar;