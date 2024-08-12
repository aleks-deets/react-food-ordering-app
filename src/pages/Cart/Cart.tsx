import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling className={styles["heading"]}>Cart</Headling>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}
      <div className={styles["line"]}>
        <div className={styles["text"]}>Итог</div>
        <div>
          {total}
          &nbsp;<span className={styles["price"]}>$</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>Доставка</div>
        <div>
          {DELIVERY_FEE}
          &nbsp;<span className={styles["price"]}>$</span>
        </div>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["line"]}>
        <div className={styles["text"]}>
          Итог&ensp;
          <span className={styles["total-count"]}>({items.length})</span>
        </div>
        <div>
          {total + DELIVERY_FEE}
          &nbsp;<span className={styles["price"]}>$</span>
        </div>
      </div>
    </>
  );
}
