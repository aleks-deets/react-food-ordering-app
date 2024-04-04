import { FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";

export function Login() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className={styles["login"]}>
      <Headling>Sign in</Headling>
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Enter email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Enter password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button appearance="big">Sign in</Button>
      </form>
      <div className={styles["links"]}>
        <div>New to our platform?</div>
        <Link to="/auth/register">Sign up now.</Link>
      </div>
    </div>
  );
}
