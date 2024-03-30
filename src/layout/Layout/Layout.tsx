import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from "classnames";

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

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
          <Link
            to="/"
            className={cn(styles["link"], {
              [styles.active]: location.pathname === "/",
            })}
          >
            <img src="/menu-icon.svg" alt="Menu icon" />
            Меню
          </Link>
          <Link to="/cart" className={styles["link"]}>
            <img src="/cart-icon.svg" alt="Cart icon" />
            Корзина
          </Link>
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
