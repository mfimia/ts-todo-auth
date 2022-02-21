import React, { FormEvent, useState } from "react";
import { UserCredentials } from "../../types/user";

const RegisterUser = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.email) {
      console.log("invalid credentials");
    } else {
      registerUser();
      setCredentials({ email: "", password: "" });
    }
  };

  const registerUser = async () => {
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: UserCredentials = await res.json();
    console.log(data);
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
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default RegisterUser;
