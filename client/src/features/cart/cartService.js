import API from '../../api/axiosConfig';

const getCart = async () => {
    const response = await API.get('/cart');
    return response.data;
};

const syncCart = async (cartData) => {
    const response = await API.post('/cart', cartData);
    return response.data;
};

const cartService = {
    getCart,
    syncCart
};

export default cartService;