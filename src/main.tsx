import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
// import App from "./App.tsx";
import "./index.css";
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error"; // Чтобы не было конфликтов
import { Layout } from "./layout/Layout/Layout.tsx";
import { Product } from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Loading....</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Error</>,
        loader: async ({ params }) => {
          //throw new Error("some error");
          /* С ИМИТАЦИЕЙ ЗАДЕРЖКИ НА 2 СЕК */
          // return defer({
          //   data: new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       axios
          //         .get(`${PREFIX}/products/${params.id}`)
          //         .then((data) => resolve(data))
          //         .catch((e) => reject(e));
          //     }, 2000);
          //   }),
          // });
          /* БЕЗ ИМИТАЦИИ ЗАДЕРЖКИ */
          return defer({
            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data),
          });
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);
