import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { useTodoList } from "../hooks/useTodoList";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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
