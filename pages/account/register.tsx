import React, { FormEvent, useState } from "react";
import { UserCredentials } from "../../types/user";

const RegisterUser = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.email) {
      console.log("invalid credentials");
    } else {
      const req = await registerUser();
      if (req.success) {
        setCredentials({ email: "", password: "" });
        //  TODO: add toast? with success. login user?
      } else {
        // TODO: add alert toast with error
      }
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
    if (res.status === 200) {
      return { success: true, msg: "User added" };
    } else {
      return { success: false, msg: res.statusText };
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
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default RegisterUser;
