import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {Container,Typography,Box,Button,CircularProgress,IconButton,} from '@mui/material';
import { addToCart, decreaseCart } from '../features/cart/cartSlice';
import { getProducts } from '../features/products/productSlice';
import Navbar from '../components/common/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Footer from '../components/common/Footer';

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!products.length) dispatch(getProducts());
  }, [dispatch, products.length]);

  const categoryProducts = products.filter(
    (p) => p.category?.toLowerCase().includes(slug.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 3, pb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Back
          </Button>
          <Typography variant="h5" fontWeight="bold" sx={{ ml: 2, textTransform: 'capitalize' }}>
            {slug} ({categoryProducts.length} items)
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {categoryProducts.map((product) => {
              const cartItem = cartItems.find((i) => i._id === product._id);
              const quantity = cartItem?.cartQuantity || 0;

              return (
                <Box
                  key={product._id}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    height: 320,               
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      height: 140,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      sx={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>

        
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      height: 44,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: 'gray', height: 18, mb: 2 }}>
                    {product.weight || '1 unit'}
                  </Typography>
                    <Typography sx={{ fontSize: 12, color: 'gray', height: 18, mb: 2 }}>
                    {product.category ? product.category : 'General'}
                  </Typography>

                  <Box
                    sx={{
                      mt: 'auto',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 36,
                    }}
                  >
                    <Typography fontWeight="bold">₹{product.price}</Typography>

                    {quantity > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: '#0c831f',
                          color: '#fff',
                          borderRadius: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => dispatch(decreaseCart(product))}
                          sx={{ color: '#fff' }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ px: 1 }}>{quantity}</Typography>

                        <IconButton
                          size="small"
                          onClick={() => dispatch(addToCart(product))}
                          sx={{ color: '#fff' }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => dispatch(addToCart(product))}
                        sx={{
                          color: '#0c831f',
                          borderColor: '#0c831f',
                          fontWeight: 'bold',
                        }}
                      >
                        ADD
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
      <Footer/>
    </Box>
  );
};

export default CategoryPage;
