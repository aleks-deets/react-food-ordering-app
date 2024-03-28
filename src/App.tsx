import { MouseEvent, useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  const [counter, setCounter] = useState<number>(0);

  const addCounter = (e: MouseEvent) => {
    console.log(e);
    setCounter(counter + 1);
  };

  return (
    <>
      <Button onClick={addCounter}>Button</Button>
      <Button appearance="big" onClick={addCounter}>
        Button
      </Button>
      <Input placeholder="Email" />
      <div>
        <a href="/">Меню</a>
        <a href="/cart">Корзина</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
