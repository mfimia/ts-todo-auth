import { FormEvent, FormEventHandler, useState } from "react";
import { TodoListItem } from "../types/todoList";

export const useTodoList = () => {
  const [input, setInput] = useState({ text: "", completed: false });
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  const handleListSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    input.text ? addInputToList() : null;
  };

  const addInputToList = () => {
    setTodoList((prev: TodoListItem[]) => [input, ...prev]);
    setInput({ text: "", completed: false });
  };

  const handleListChange: FormEventHandler = (e: FormEvent) => {
    const typedInput = e.target as HTMLInputElement;
    setInput((prev) => ({ ...prev, text: typedInput.value }));
  };

  const handleListDelete = (index: number) => {
    const filteredItems = todoList.filter((_, i) => i !== index);
    setTodoList(filteredItems);
  };

  const handleListComplete = (index: number) => {
    setTodoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return {
    input,
    todoList,
    handleListChange,
    handleListDelete,
    handleListSubmit,
    handleListComplete,
  };
};
