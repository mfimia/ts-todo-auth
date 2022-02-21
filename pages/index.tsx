import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useTodoList } from "../hooks/useTodoList";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

let storedToken = "";
// if window is not undefined, we are on the client. else, on the server
if (typeof window !== "undefined")
  storedToken = localStorage.getItem("ts-todo-token") as string;

const Home: NextPage = () => {
  const [token, setToken] = useState(storedToken);
  const router = useRouter();

  useEffect(() => {
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
    checkAuthorization();
  }, [token]);

  const {
    handleChange,
    handleDelete,
    handleComplete,
    handleSubmit,
    input,
    todoList,
  } = useTodoList();

  return (
    <Fragment>
      <Head>
        <title>TSC List</title>
        <meta name="description" content="Example TODO list with NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            name="todo-list"
            onChange={handleChange}
            value={input.text}
            type="text"
          />
          <button>Add</button>
        </form>
        <ul>
          {todoList.map((item, index) => (
            <li key={`${item.text}_${index}`}>
              <span
                style={{
                  color: item.completed ? "green" : "black",
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleComplete(index)}>Complete</button>
            </li>
          ))}
        </ul>
      </main>
    </Fragment>
  );
};

export default Home;
