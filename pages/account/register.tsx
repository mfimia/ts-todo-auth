import { NextPage } from "next";
import { useCredentials } from "../../hooks/useCredentials";

const RegisterUser: NextPage = () => {
  const { credentials, handleChange, handleSubmit } = useCredentials();

  return (
    <div style={{ position: "absolute", top: "30%", left: "30%" }}>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e, "register")}>
        <input
          value={credentials.register.email}
          onChange={(e) => handleChange(e, "register")}
          name="email"
          type="email"
        />
        <input
          value={credentials.register.password}
          onChange={(e) => handleChange(e, "register")}
          name="password"
          type="password"
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default RegisterUser;
