import React, { FormEvent, useState } from "react";
import { UserCredentials } from "../../types/user";

const LoginUser = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.email) {
      console.log("invalid credentials");
    } else {
      loginUser();
      // setCredentials({ email: "", password: "" });
    }
  };

  const loginUser = async () => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      const token = data.token;
      console.log(token);
    } else {
      const errorData = res.statusText;
      console.log(errorData);
    }
  };

  const handleChange = (e: FormEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ position: "absolute", top: "30%", left: "30%" }}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          value={credentials.email}
          onChange={handleChange}
          name="email"
          type="email"
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default LoginUser;
