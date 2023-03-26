import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FormCreate } from "./components/FormCreate";
import { List } from "./components/List";
import { AppDispatch } from "./store";
import { fetchGetTodos } from "./store/slices/todosSlice";
import "./App.scss";

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchGetTodos())
  }, [])

  return (
    <div className="app">
      <div className="wrapper">
        <FormCreate />
        <List />
      </div>
    </div>
  );
}
