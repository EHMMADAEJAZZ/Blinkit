import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addressApi, cartApi, orderApi } from '../common/api';
import { setCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import { addAddress } from '../features/address/addressSlice';
import { handleOrders } from '../features/order/orderSlice';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const data = await cartApi.fetchCartItems();
      dispatch(setCart(data?.data));
    } catch (error) {
      if (error?.message) {
        throw new Error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  //update caertItemQuantity
  const updateCartItemQuantity = async (cartItemId, quantity) => {
    setLoading(true);
    try {
      const res = await cartApi.updateCartItemQuantity(cartItemId, quantity);
      toast.success(res?.message);
      fetchCartItems();
    } catch (error) {
      if (error?.message) {
        throw new Error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //delete cart item
  const deleteCartItem = async (cartItemId) => {
    setLoading(true);
    try {
      const res = await cartApi.deleteCartItem(cartItemId);
      toast.success(res?.message);
      fetchCartItems();
    } catch (error) {
      if (error?.message) {
        throw new Error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    dispatch(setCart([]));
    toast.success('Cart cleared successfully');
  };
  //fetch addresses
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await addressApi.fetchAddresses();
      dispatch(addAddress(data?.data));
    } catch (error) {
      if (error?.message) {
        throw new Error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderApi.fetchUserOrders();
      dispatch(handleOrders(data?.data));
    } catch (error) {
      if (error?.message) {
        throw new Error(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //place order
  useEffect(() => {
    fetchCartItems();
    fetchOrders();
    fetchAddresses(); // call the fetchCartItems when the component mounts.
  }, [userDetails]);
  const value = {
    fetchCartItems,
    loading,
    updateCartItemQuantity,
    deleteCartItem,
    handleClearCart,
    fetchAddresses,
    fetchOrders,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const UseGlobalContext = () => {
  return useContext(GlobalContext);
};
