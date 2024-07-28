import { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    //setError(null);
    //console.log(e);
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    //console.log(email.value + " " + password.value);
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
    /*
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      //console.log(data);
      //localStorage.setItem('jwt', JSON.stringify(data));
      //localStorage.setItem("jwt", data.access_token); // можно и без stringify() т.к. access_token уже и так строка
      dispatch(userActions.addJwt(data.access_token));
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        //console.log(e);
        setError(e.response?.data.message);
      }
    }
    */
  };

  return (
    <div className={styles["login"]}>
      <Headling>Sign in</Headling>
      {loginErrorMessage && (
        <div className={styles["error"]}>{loginErrorMessage}</div>
      )}
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
