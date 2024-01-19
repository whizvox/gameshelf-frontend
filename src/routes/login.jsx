import { Navigate, useLoaderData } from "react-router-dom";
import "../css/login.css";

export default function Login() {
  const user = useLoaderData();
  if (user) {
    return <Navigate to="/" />
  }

  function attemptLogin(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("/api/login", {
      method: "post",
      body: new URLSearchParams(data)
    })
    .then(res => res.json())
    .then(res => {
      location.href = "/";
    })
    .catch(err => {
      alert(err);
    });
  }

  return (
    <div id="login">
      <h1>Login</h1>
      <form id="login-form" onSubmit={attemptLogin}>
        <div id="group-username" className="input-group">
          <label htmlFor="login-username">Username or Email</label>
          <input type="text" id="login-username" name="username" />
        </div>
        <div id="group-password" className="input-group">
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" name="password" />
        </div>
        <div id="group-remember" className="input-group">
          <input type="checkbox" id="login-remember" name="rememberMe" />
          <label htmlFor="login-remember">Remember Me</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}