import { Fragment, useState, useRef } from "react";
import classes from "./Register.module.css";

const Register = () => {
  const [loading, setIsLoading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const registerSubmitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP63Dc5ELzs6ft_x3vrW-eZJMGkJ_xsG8",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredUsername,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json().then((data) => {
          console.log(data);
        });
      } else {
        alert("Register failed");
      }
    });
  };

  return (
    <Fragment>
      <form className={classes.formm} onSubmit={registerSubmitHandler}>
        <div className={classes.control}>
          <label>Username </label>
          <input type="username" id="username" ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label>Password</label>
          <input
            type="password"
            id="password"
            required
            minLength="5"
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {!loading && <button onClick={registerSubmitHandler}>Register</button>}
          {loading && <p>Sending Request...</p>}
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
