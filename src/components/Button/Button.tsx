import { FC } from "react";
import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from "classnames";

export const ButtonAlt: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(styles["button"], styles["accent"], className)}
    >
      {children}
    </button>
  );
};

function Button({
  children,
  className,
  appearance = "small",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(styles["button"], styles["accent"], className, {
        [styles["small"]]: appearance === "small",
        [styles["big"]]: appearance === "big",
      })}
    >
      {children}
    </button>
  );
}

export default Button;
