import { MouseEvent, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";

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
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
