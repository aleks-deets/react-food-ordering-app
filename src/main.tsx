import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import App from "./App.tsx";
import "./index.css";
import { Cart } from "./pages/Cart/Cart";
import { Error as ErrorPage } from "./pages/Error/Error"; // Чтобы не было конфликтов
import { Layout } from "./layout/Layout/Layout.tsx";
import { Product } from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";

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
          /* ИМИТАЦИЯ ЗАДЕРЖКИ НА 2 СЕК */
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          /* REQUEST */
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
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
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
