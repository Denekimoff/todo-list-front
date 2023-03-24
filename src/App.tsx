import "./App.css";
import { FormCreate } from "./components/FormCreate";
import { List } from "./components/List";

export default function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <FormCreate />
        <List />
      </div>
    </div>
  );
}
