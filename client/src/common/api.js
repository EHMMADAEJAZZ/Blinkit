import axios from 'axios';
const Axios = axios.create({
  baseURL: 'https://blinkit-grocery.vercel.app/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  },
  
  
});


const userEndPoint = {
  users: '/user',
};
// Define the API functions
const api = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await Axios.get(userEndPoint.users);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  // Get a user by ID
  getUserById: async (userId) => {
    try {
      const response = await Axios.get(`${userEndPoint.users}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  // Create a new user
  registerUser: async (userData) => {
    try {
      const response = await Axios.post(
        `${userEndPoint.users}/register`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //login user
  loginUser: async (userData) => {
    try {
      const response = await Axios.post(
        `${userEndPoint.users}/login`,
        userData
      );
      localStorage.setItem('accessToken', response?.data?.data?.accessToken);
      localStorage.setItem('refreshTtoken', response?.data?.data?.refreshToken);

      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //verify User
  verifyUser: async (code) => {
    try {
      const response = await Axios.post(
        `${userEndPoint.users}/verify-email?code=${code}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //logout user
  logoutUser: async () => {
    try {
      const response = await Axios.post(`${userEndPoint.users}/logout`);
      localStorage.clear();
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update user
  updateUser: async (userData) => {
    try {
      const response = await Axios.put(
        `${userEndPoint.users}/update-user`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete user
  //forgot password
  forgotPassword: async (data) => {
    try {
      const response = await Axios.post(
        `${userEndPoint.users}/forgot-password`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //reset password
  resetPassword: async (token, userData) => {
    try {
      const response = await Axios.post(
        `${userEndPoint.users}/reset-password?token=${token}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  refreshAccessToken: async (refreshAccessToken) => {
    try {
      const response = await Axios.post(`${userEndPoint.users}/refresh-token`, {
        headers: `Bearer ${refreshAccessToken}`,
      });
      const accessToken = response?.data?.data?.accessToken;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  getMe: async () => {
    try {
      const response = await Axios.get(`${userEndPoint.users}/get-me`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //upload avatar image
  uploadAvatar: async (formData) => {
    try {
      const response = await Axios.put(
        `${userEndPoint.users}/upload-avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //change-password

  changeCurrentPassword: async (data) => {
    try {
      const response = await Axios.post(
        `${userEndPoint.users}/change-password`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};
export default api;
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (response) => {
    // Handle request success
    return response;
  },
  async (error) => {
    let originRequest = error.config;
    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const newAccessToken = await api.refreshAccessToken(refreshToken);
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          originRequest.headers.Authorization = `Bearer ${newAccessToken.accessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);
//category Api methods;
const categoryEndpoints = {
  category: '/category',
  subCategory: '/subcategory',
};
export const categoryApi = {
  addCategory: async (formData) => {
    try {
      const response = await Axios.post(
        `${categoryEndpoints.category}/add-category`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch all categories
  fetchCategories: async () => {
    try {
      const response = await Axios.get(
        `${categoryEndpoints.category}/categories`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update category
  updateCategory: async (categoryId, formdata) => {
    try {
      const response = await Axios.put(
        `${categoryEndpoints.category}/categories/${categoryId}`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete category
  deleteCategory: async (categoryId) => {
    try {
      const response = await Axios.delete(
        `${categoryEndpoints.category}/categories/${categoryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //sub category methods
  addSubCategory: async (categoryId, formData) => {
    try {
      const response = await Axios.post(
        `${categoryEndpoints.subCategory}/add-sub-category/${categoryId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch all sub categories
};

export const subcategoryApis = {
  // add sub category
  addSubCategory: async (formData) => {
    try {
      const response = await Axios.post(
        `${categoryEndpoints.subCategory}/add-subcategory`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch all sub categories
  fetchSubCategories: async () => {
    try {
      const response = await Axios.get(`${categoryEndpoints.subCategory}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //update sub category
  updateSubCategory: async (subCategoryId, formdata) => {
    try {
      const response = await Axios.put(
        `${categoryEndpoints.subCategory}/${subCategoryId}`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete sub category
  deleteSubCategory: async (subCategoryId) => {
    try {
      const response = await Axios.delete(
        `${categoryEndpoints.subCategory}/${subCategoryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};
const productEndpoints = {
  product: '/product',
};

export const productApi = {
  addProduct: async (formData) => {
    try {
      const response = await Axios.post(
        `${productEndpoints.product}/add-product`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch all products
  fetchProducts: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/products?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetch product by category
  fetchProductsByCategory: async (
    categoryId,
    page = 1,
    limit = 20,
    search = ''
  ) => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/products/category/${categoryId}?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetch product by subcategory
  fetchProductsBySubcategory: async (subcategoryId, page = 1, limit = 10) => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/products/subcategory/${subcategoryId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetchProductByCategoryAndSubcatgory
  fetchProductsByCategoryAndSubcategory: async (
    categoryId,
    subcategoryId,
    page = 1,
    limit = 10
  ) => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/products/category/${categoryId}/subcategory/${subcategoryId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //get product by id
  fetchProductDetails: async (productId) => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/products/${productId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetch product by slug
  fetchProductBySlug: async (slug) => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/products/slug/${slug}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //add to cart
  //update product
  updateProduct: async (productId, formData) => {
    try {
      const response = await Axios.put(
        `${productEndpoints.product}/products/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //delete product
  deleteProduct: async (productId) => {
    try {
      const response = await Axios.delete(
        `${productEndpoints.product}/products/${productId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //search for products
  searchProducts: async (page = 1, limit = 10, search = '') => {
    try {
      const response = await Axios.get(
        `${productEndpoints.product}/search-products?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
};
const cartEndpoints = {
  cart: '/cart',
};

export const cartApi = {
  //add to cart
  addToCart: async (productId) => {
    try {
      const response = await Axios.post(
        `${cartEndpoints.cart}/add-to-cart/${productId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch cart items
  fetchCartItems: async () => {
    try {
      const response = await Axios.get(`${cartEndpoints.cart}/cart-items`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //update cart item quantity
  updateCartItemQuantity: async (cartItemId, quantity) => {
    try {
      const response = await Axios.put(
        `${cartEndpoints.cart}/update-cart-item-quantity/${cartItemId}`,
        { quantity }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //delete cart item
  deleteCartItem: async (cartItemId) => {
    try {
      const response = await Axios.delete(
        `${cartEndpoints.cart}/delete-cart-item/${cartItemId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //apply coupon

};

//ADDRESS END POINTS
const addressEndpoints = {
  address: '/address',
};

export const addressApi = {
  //add address
  addAddress: async (data) => {
    try {
      const response = await Axios.post(
        `${addressEndpoints.address}/add-address`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch all addresses
  fetchAddresses: async () => {
    try {
      const response = await Axios.get(`${addressEndpoints.address}/addresses`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //update address
  updateAddress: async (addressId, data) => {
    try {
      const response = await Axios.put(
        `${addressEndpoints.address}/update-address/${addressId}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //delete address
  deleteAddress: async (addressId) => {
    try {
      const response = await Axios.delete(
        `${addressEndpoints.address}/delete-address/${addressId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //set primary address
  setPrimaryAddress: async (addressId) => {
    try {
      const response = await Axios.put(
        `${addressEndpoints.address}/set-primary-address/${addressId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //disable address
  disableAddress: async (addressId) => {
    try {
      const response = await Axios.put(
        `${addressEndpoints.address}/disable-address/${addressId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //enable address
  enableAddress: async (addressId) => {
    try {
      const response = await Axios.put(
        `${addressEndpoints.address}/enable-address/${addressId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
}
const orderEndpoints = {
  order: '/order',
};

export const orderApi = {
  //place order cashOnDeliveryOrder
  cashOnDeliveryOrder: async (cartItems, shippingAddressId,totalAmount) => {
    try {
      const response = await Axios.post(
        `${orderEndpoints.order}/place-order-cash-on-delivery`,
        { cartItems, shippingAddressId ,totalAmount}
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
 //place order onLinePaymentOrder
  onLinePaymentOrder: async (cartItems, shippingAddressId, totalAmount, paymentMethodId='1234') => {
    try {
      const response = await Axios.post(
        `${orderEndpoints.order}/checkout`,
        { cartItems, shippingAddressId, totalAmount, paymentMethodId }
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch order by id
  fetchOrderById: async (orderId) => {
    try {
      const response = await Axios.get(`${orderEndpoints.order}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetch user orders
  fetchUserOrders: async () => {
    try {
      const response = await Axios.get(
        `${orderEndpoints.order}/orders/user`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetch all orders
  fetchAllOrders: async (page = 1, limit = 10) => {
    try {
      const response = await Axios.get(
        `${orderEndpoints.order}/orders/admin?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },
  //fetch user orders
  fetchOrders: async (page = 1, limit = 10) => {
    try {
      const response = await Axios.get(
        `${orderEndpoints.order}/orders?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message);
    }
  },

  //fetch order by id
}