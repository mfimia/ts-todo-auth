import { FormEvent, useState } from "react";
import { AppCredentials, UserForm } from "../types/credentials";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";

export const useCredentials = () => {
  const getToken = () => {
    const isPageOnServer = isServer();
    // if window is not undefined, we are on the client. else, on the server
    if (!isPageOnServer) {
      const tokenString = sessionStorage.getItem("ts-todo-token") as string;
      const userToken = JSON.parse(tokenString);
      return userToken;
    }
  };

  const [token, setToken] = useState(getToken());
  const [credentials, setCredentials] = useState<AppCredentials>({
    login: {
      email: "",
      password: "",
    },
    register: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { pathname } = router;

  const storeToken = (userToken: string) => {
    sessionStorage.setItem("ts-todo-token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const handleChange = (e: FormEvent, form: UserForm) => {
    const { value, name } = e.target as HTMLInputElement;
    setCredentials((prev: AppCredentials) => {
      return {
        ...prev,
        [form]: {
          ...prev[form],
          [name]: value,
        },
      };
    });
  };

  const handleSubmit = async (e: FormEvent, form: UserForm) => {
    e.preventDefault();
    if (!credentials[form].email || !credentials[form].email) {
      console.log("invalid credentials");
      //   TODO: add credentials error
    } else {
      if (form === "login") {
        await loginUser(form);
      } else if (form === "register") {
        const req = await registerUser();
        if (req.success) {
          await loginUser(form);
        } else {
          // TODO: add alert toast with error
        }
      }
    }
  };

  const redirectFromLogin = () =>
    pathname === "/account/login" ? router.push("/") : router.reload();

  const loginUser = async (form: UserForm) => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(credentials[form]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      const token = data.token;
      storeToken(token);
      redirectFromLogin();
    } else {
      // TODO: handle error data
      console.log(data);
    }
  };

  const registerUser = async () => {
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(credentials.register),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return { success: true, msg: "User added" };
    } else {
      const data = await res.json();
      const { msg } = data;
      return { success: false, msg };
    }
  };

  const checkAuthorization = async () => {
    const res = await fetch("/api/users/auth", {
      headers: {
        "x-auth-token": token,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setToken(data.token);
    } else {
      setToken("");
      router.push("/account/login");
    }
  };

  return {
    credentials,
    token,
    storeToken,
    handleChange,
    handleSubmit,
    checkAuthorization,
  };
};
