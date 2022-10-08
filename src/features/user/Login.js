import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsync,
  logout,
  selectToken,
  selectLoginLoading,
  selectLoginErrors,
} from "./userSlice";

export function Login() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const loading = useSelector(selectLoginLoading);
  const errors = useSelector(selectLoginErrors);

  return (
    <div>
      <span>
        <button
          disabled={loading}
          onClick={() => dispatch(loginAsync("user", "pass"))}
        >
          Login
        </button>
        <button disabled={loading} onClick={() => dispatch(logout())}>
          Logout
        </button>
      </span>
      {loading ? <p>Loading...</p> : <img src={token} height="500px" />}
    </div>
  );
}
