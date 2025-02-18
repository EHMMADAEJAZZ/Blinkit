import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import ApplayOut from '../UI/ApplayOut';
import About from '../pages/About';
import Search from '../pages/Search';
import Auth from '../pages/Auth';
import ForgotPassword from '../pages/ForgotPassword';
import Verifyuser from '../pages/Verifyuser';
import ResetPassword from '../pages/ResetPassword';
import OtpVerification from '../pages/OtpVerification';
import UserMenuMobilePage from '../pages/UserMenuMobilePage';
import Dashboard from '../layout/Dashboard';
import Profile from '../pages/Profile';
import Order from '../pages/Order';
import Address from '../pages/Address';
import Category from '../pages/Category';
import SubCategoryPage from '../pages/SubCategoryPage';
import UploadProductPage from '../pages/UploadProductPage';
import ProductPage from '../pages/ProductPage';
import AdminPermissions from '../layout/AdminPermissions';
import CategoryListingPage from '../pages/CategoryListingPage';
import ProductDisplayPage from '../pages/ProductDisplayPage';
import UpdateProuct from '../pages/UpdateProduct';
import Cart from '../pages/Cart';
import CheckoutPage from '../pages/CheckoutPage';
import SuccessPage from '../pages/SuccessPage';
import CancelPage from '../pages/CancelPage';

const router = createBrowserRouter([
  {
    path: '/',
    exact: true,
    element: <App />,

    children: [
      {
        element: <ApplayOut />,

        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'about',
            element: <About />,
          },
          {
            path: 'search',
            element: <Search />,
          },
          {
            path: 'auth',
            element: <Auth />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: 'verify-email',
            element:<Verifyuser/>,
          },
          
          {
            path: 'reset-password',
            element:<ResetPassword/>,
          },
          {
            path: 'otp',
            element:<OtpVerification/>,
          },
          {
            path: 'user',
            element:<UserMenuMobilePage/>,
          },
          {
            path:'cart',
            element:<Cart/>
          },
          {
            path:'checkout',
            element:<CheckoutPage/>
          },
          {
            path:'success',
            element:<SuccessPage/>
          },
          {
            path:'cancel',
            element:<CancelPage/>
          },
          {
            
            
            path: 'dashboard',
            element:<Dashboard/>,
            children: [
              {

                element:<AdminPermissions/>,
                children:[
                
              {
                path: 'category',
                element: <Category />,
                
              },
              {
                path: 'sub-category',
                element: <SubCategoryPage />,
                
              },
              {
                path: 'upload-product',
                element: <UploadProductPage />,
                
              },
              {
                path: 'products',
                element: <ProductPage />,
                
              },
              {
                path: 'product/:id',
                element: <UpdateProuct />,
                
              },
             
                ]
              },
                {
                path: 'profile',
                element: <Profile />,
                
              },
              {
                path: 'orders',
                element: <Order />,
                
              },
              {
                path: 'address',
                element: <Address />,
                
              },
              
            ],
          
              
          },
          {
            path:":category",
            children:[
              {
                path:":categoryId/:subcategoryId",
                element: <CategoryListingPage />,
              },
            ]
          },
          {
            path: 'product/:productId',
            element: <ProductDisplayPage />,
          }
        
          
        ],
      },
        {
            path: '*',
            element: <ErrorPage />,
          }
    ],
  },
]);

export default router;
