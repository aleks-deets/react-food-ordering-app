import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.increase(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.decrease(props.id));
  };

  const remove = () => {
    dispatch(cartActions.remove(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["descpirtion"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["price"]}>{props.price}&nbsp;$</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={decrease}>
          <img src="minus-icon.svg" alt="Remove item from cart" />
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button className={styles["plus"]} onClick={increase}>
          <img src="/plus-icon.svg" alt="Add item to cart" />
        </button>
        <button className={styles["remove"]} onClick={remove}>
          <img src="/delete-icon.svg" alt="Remove all" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
