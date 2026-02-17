import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/products/productSlice';

import Navbar from '../components/common/Navbar';
import HeroBanner from '../components/common/HeroBanner';
import CategoryGrid from '../components/common/CategoryGrid';
import ProductRow from '../components/common/ProductRow';
import Footer from '../components/common/Footer';
import CouponStrip from '../components/common/CouponStrip';

const HomePage = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) =>
        Array.isArray(state.product.products)
            ? state.product.products
            : state.product.products?.products || []
    );

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const vegetables = products.filter(
        p => p.category && p.category.toLowerCase().includes('veg')
    );

    const dairy = products.filter(
        p =>
            p.category &&
            (p.category.toLowerCase().includes('milk') ||
                p.category.toLowerCase().includes('dairy'))
    );

    const drinks = products.filter(
        p => p.category && p.category.toLowerCase().includes('drinks')
    );

    const snacks = products.filter(
        p => p.category && p.category.toLowerCase().includes('snacks')
    );

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <HeroBanner />
                <CouponStrip />
                <CategoryGrid />

                {products.length > 0 ? (
                    <>
                        <ProductRow
                            title="Dairy, Bread & Eggs"
                            products={dairy.length ? dairy : products.slice(0, 4)}
                        />

                        <ProductRow
                            title="Fresh & Vegetables"
                            products={vegetables.length ? vegetables : products.slice(4, 8)}
                        />

                        <ProductRow
                            title="Cool Drinks & Juices"
                            products={drinks.length ? drinks : products.slice(8, 12)}
                        />

                        <ProductRow
                            title="Snacks & Munchies"
                            products={snacks.length ? snacks : products.slice(12, 16)}
                        />

                        <ProductRow
                            title="Recommended for You"
                            products={products}
                        />
                    </>
                ) : (
                    <Typography sx={{ textAlign: 'center', mt: 4 }}>
                        Loading products...
                    </Typography>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default HomePage;
