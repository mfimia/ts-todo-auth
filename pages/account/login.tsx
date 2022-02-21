import React, { FormEvent, useState } from "react";
import { UserCredentials } from "../../types/user";
import { useRouter } from "next/router";
import { NextPage } from "next";

const LoginUser: NextPage = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.email) {
      console.log("invalid credentials");
    } else {
      loginUser();
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
      localStorage.setItem("ts-todo-token", token);
      router.push("/");
    } else {
      const data = await res.json();
      // TODO: handle error data
      console.log(data);
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
