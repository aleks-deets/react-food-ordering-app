import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";

export function Layout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src="/avatar.png"
            alt="Avatar of user"
            style={{ width: "200px" }}
          />
          <div className={styles["name"]}>Name Surname</div>
          <div className={styles["email"]}>email@gmail.com</div>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src="/menu-icon.svg" alt="Menu icon" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src="/cart-icon.svg" alt="Cart icon" />
            Корзина
          </NavLink>
        </div>
        <Button className={styles["exit"]}>
          <img src="/exit-icon.svg" alt="Exit icon" />
          Выход
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
