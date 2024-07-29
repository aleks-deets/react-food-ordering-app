import { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    //console.log(e);
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    //console.log(email.value + " " + password.value);
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  return (
    <div className={styles["login"]}>
      {/* <Headling>Create your account</Headling> */}
      {/* <Headling>Sign up and start using FoodApp</Headling> */}
      <Headling>Sign up to application</Headling>
      {registerErrorMessage && (
        <div className={styles["error"]}>{registerErrorMessage}</div>
      )}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          {/* <label htmlFor="name">Choose a username</label> */}
          {/* <label htmlFor="name">Enter account name</label> */}
          <label htmlFor="name">Enter your name</label>
          <Input id="name" name="name" placeholder="Name" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="email">Enter your email address</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Create password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        {/* <Button appearance="big">Create a new account</Button> */}
        <Button appearance="big">Sign up</Button>
      </form>
      <div className={styles["links"]}>
        <div>Already have an account?</div>
        <Link to="/auth/login">Log in here</Link>
      </div>
    </div>
  );
}
