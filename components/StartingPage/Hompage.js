import { Fragment } from "react";
import classes from "./HomePage.module.css";
import { useRef, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const Hompage = (props) => {
  const [loading, setIsLoading] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
 const ctx = useContext(AuthContext)
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP63Dc5ELzs6ft_x3vrW-eZJMGkJ_xsG8",
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
          ctx.login(data.idToken)
        });
      } else {
        alert("Login Failed");
      }
    });
  };

  return (
    <Fragment>
      {ctx.isLoggedIn && <div className={classes.h1welcome}><h1>WELCOME!</h1></div>}
      {!ctx.isLoggedIn && <form className={classes.form} onSubmit={formSubmitHandler}>
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
          {!loading && <button onClick={formSubmitHandler}>Login</button>}
          {loading && <p>Sending Request...</p>}
        </div>
      </form>
}    </Fragment>
  );
};

export default Hompage;
