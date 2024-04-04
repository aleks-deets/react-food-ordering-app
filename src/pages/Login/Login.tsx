import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const [error, setError] = useState<string | null>();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    //console.log(e);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    //console.log(email.value + " " + password.value);
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      console.log(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        //console.log(e);
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className={styles["login"]}>
      <Headling>Sign in</Headling>
      {error && <div className={styles["error"]}>{error}</div>}
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
        {/* <div>Don't have an account?</div>
        <Link to="/auth/register">Sign up</Link> */}
        <div>New to our platform?</div>
        <Link to="/auth/register">Sign up now.</Link>
      </div>
    </div>
  );
}
