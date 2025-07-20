import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/custom/Navbar";
import { ThemeProvider } from "./components/provider/theme-provider";
import Footer from "./components/custom/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminLogin from "./pages/AdminLogin";
import Error from "./pages/Error";
import Success from "./pages/Success";
import RootLayout from "./layouts/RootLayout";
import AdminLayout from "./layouts/AdminLayout";
import CreateProducts from "./components/custom/CreateProducts";
import AllProducts from "./components/custom/AllProducts";
import Analytics from "./components/custom/Analytics";
import Orders from "./components/custom/Orders";
import Settings from "./components/custom/Settings";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import { Toaster,toast } from "sonner";
import ProtectedRoutes from "./components/custom/ProtectedRoute";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <ProtectedRoutes><RootLayout children={<Home />} /></ProtectedRoutes>},
    { path: "/signup", element:<ProtectedRoutes><RootLayout children={<Signup />} /></ProtectedRoutes>  },
    { path: "/login", element:<ProtectedRoutes><RootLayout children={<Login />} /></ProtectedRoutes>  },
    { path: "/product/:productName", element: <RootLayout children={<Product />} /> },
    { path: "/checkout", element: <ProtectedRoutes><RootLayout children={<Checkout />} /> </ProtectedRoutes> },
    { path: "/orders", element:<ProtectedRoutes><RootLayout children={<MyOrders />} /> </ProtectedRoutes> },
    { path: "/admin/login", element: <ProtectedRoutes> <RootLayout children={<AdminLogin />} /></ProtectedRoutes>  },
    { path: "/admin/dashboard", element: <ProtectedRoutes> <AdminLayout children={<CreateProducts/>}/></ProtectedRoutes>  },
    { path: "/admin/dashboard/all-products", element: <ProtectedRoutes> <AdminLayout children={<AllProducts/>}/></ProtectedRoutes>  },
    { path: "/admin/dashboard/analytics", element: <ProtectedRoutes> <AdminLayout children={<Analytics/>}/></ProtectedRoutes>  },
    { path: "/admin/dashboard/orders", element: <ProtectedRoutes> <AdminLayout children={<Orders/>}/> </ProtectedRoutes> },
    { path: "/admin/dashboard/settings", element:<ProtectedRoutes>  <AdminLayout children={<Settings/>}/></ProtectedRoutes>  },

    {
      path: "/*",
      element: <Error />,
    },

    {
      path: "/success",
      element: <Success />,
    },
  ]);
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
        <Toaster/>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
