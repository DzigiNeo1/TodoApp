import classes from "./MainNavigation.module.css";
import Link from "next/link";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const MainNavigation = () => {
  const ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;
  const logoutHandler = (event) => {
    event.preventDefault();

    ctx.logout(null);
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Kimicom Group</div>
      </Link>
      <nav>
        <ul>
         

          {isLoggedIn && (
            <Link href="/profile">
              <li>Profile</li>
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/register">
              <li>Register</li>
            </Link>
          )}

          {!isLoggedIn && (
            <li>
              <Link href="/">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <Link href="/changepassword">
              <li>Change Password</li>
            </Link>
          )}
          {isLoggedIn && (
            <li onClick={logoutHandler}>
              <Link href="/">Logout</Link>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
