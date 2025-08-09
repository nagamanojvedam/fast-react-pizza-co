import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as createOrderAction } from "./features/order/CreateOrder";
import { action as updateOrderAction } from "./features/order/UpdateOrder";

import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./ui/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import Error from "./ui/Error";
import OrdersList, {
  loader as ordersLoader,
} from "./features/order/OrdersList";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: menuLoader },
      { path: "/cart", element: <Cart /> },
      {
        path: "/orders",
        element: <OrdersList />,
        loader: ordersLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        action: updateOrderAction,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
