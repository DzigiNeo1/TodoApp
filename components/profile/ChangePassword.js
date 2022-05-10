import classes from "./ChangePassword.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { useState } from "react";
const ChangePassword = () => {
  const [changedPass, setChangedPass] = useState(false);
  const router = useRouter();
  const ctx = useContext(AuthContext);
  const inputRef = useRef();
  const changePasswordHandler = (event) => {
    event.preventDefault();

    const token = ctx.token;
    const enteredNewPasword = inputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCP63Dc5ELzs6ft_x3vrW-eZJMGkJ_xsG8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPasword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      setChangedPass(true);
      if (res.ok) {
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    });
  };

  return (
    <form onSubmit={changePasswordHandler}>
      <div className={classes.change}>
        {changedPass && <div>Your password have been changed!</div>}
        <input ref={inputRef} type="password" id="new-password" minLength="6" />
        <div className={classes.actions}>
          <button>Change Password</button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
