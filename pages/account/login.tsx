import { useCredentials } from "../../hooks/useCredentials";
import { NextPage } from "next";

const LoginUser: NextPage = () => {
  const { credentials, handleChange, handleSubmit } = useCredentials();

  return (
    <div style={{ position: "absolute", top: "30%", left: "30%" }}>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e, "login")}>
        <input
          value={credentials.login.email}
          onChange={(e) => handleChange(e, "login")}
          name="email"
          type="email"
        />
        <input
          value={credentials.login.password}
          onChange={(e) => handleChange(e, "login")}
          name="password"
          type="password"
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default LoginUser;
