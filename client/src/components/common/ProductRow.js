import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseCart } from '../../features/cart/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProductRow = ({ title, products }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const scrollRef = useRef(null);

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateButtons = () => {
      setShowPrev(el.scrollLeft > 5);
      setShowNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    };

    updateButtons();
    el.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    return () => {
      el.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [products]);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -240 : 240,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ position: 'relative' }}>
        {/* PREV */}
        {showPrev && (
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              left: -12,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'white' },
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        {/* NEXT */}
        {showNext && (
          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              right: -12,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'white' },
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        {/* PRODUCTS */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
            px: 1
          }}
        >
          {products.map((product) => {
            const cartItem = cartItems.find(
              (item) => item._id === product._id
            );
            const quantity = cartItem ? cartItem.cartQuantity : 0;

            return (
              <Card
                key={product._id}
                sx={{
                  minWidth: 200,
                  maxWidth: 200,
                  borderRadius: 3,
                  border: '1px solid #eee'
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  sx={{ p: 2, objectFit: 'contain' }}
                />

                <CardContent sx={{ p: 1.5 }}>
                  <Typography fontSize={12} color="text.secondary">
                    10 mins
                  </Typography>

                  <Typography fontWeight="bold" fontSize={14} sx={{ height: 40 }}>
                    {product.name}
                  </Typography>

                  <Typography fontSize={12} color="text.secondary" mb={1}>
                    {product.category}
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">₹{product.price}</Typography>

                    {quantity > 0 ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: '#0c831f',
                          borderRadius: 1,
                          color: 'white'
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => dispatch(decreaseCart(product))}
                          sx={{ color: 'white' }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography px={1}>{quantity}</Typography>

                        <IconButton
                          size="small"
                          onClick={() => dispatch(addToCart(product))}
                          sx={{ color: 'white' }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => dispatch(addToCart(product))}
                        sx={{
                          color: '#0c831f',
                          borderColor: '#0c831f',
                          fontWeight: 'bold',
                          textTransform: 'none'
                        }}
                      >
                        ADD
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductRow;
