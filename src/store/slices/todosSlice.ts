import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PATHDOMAIN } from "../../constants";
import { httpRequest } from "../../httpRequests";

export const fetchGetTodos = createAsyncThunk(
 "user/fetchGetTodos",
 async function (_, { dispatch }) {
   try {
     const response: Response = await httpRequest(`${PATHDOMAIN}/todos`, 'GET')
     const data = await response.json();
     const { list } = data;
     localStorage.setItem("todos", list);
     const renderTodos = JSON.parse(localStorage.getItem("todos"));
     dispatch(addTodo(renderTodos));
   } catch {
     alert(`ПЕРВАЯ ЗАГРУЗКА, Что-то пошло не так`);
   }
 }
);

export const fetchPostTodos = createAsyncThunk(
  "user/fetchAddTodo",
  async function (_, { dispatch }) {
    const currentTodos = localStorage.getItem("todos");
    try {
      const response: Response = await httpRequest(`${PATHDOMAIN}/todos/post`, 'POST', currentTodos)
      const data = await response.json();
      const { list } = data;
      localStorage.setItem("todos", list);
      const renderTodos = JSON.parse(localStorage.getItem("todos"));
      dispatch(addTodo(renderTodos));
    } catch {
      alert(`Что-то пошло не так`);
      }
  }
);

export const requestAddTodo = createAsyncThunk(
 "user/requestAddTodo",
 async function (action: any, { dispatch }) {
  console.log(action)
       const todos =  await JSON.parse(localStorage.getItem("todos"));
       const updateTodos = todos.push(action)
       localStorage.setItem("todos", updateTodos);
       dispatch(addTodo(updateTodos));
 }
);

export const requestEditTodo = createAsyncThunk(
 "user/requestEditTodo",
 async function (action: any, { dispatch }) {
       const { id } = action
       const todos =  await JSON.parse(localStorage.getItem("todos"));
       const updateTodos =  [...todos]
       const index = updateTodos.findIndex(todo => todo.id === id)
       updateTodos[index] = action
       localStorage.setItem("todos", JSON.stringify(updateTodos));
       dispatch(addTodo(updateTodos));
 }
);

export const requestDeleteTodo = createAsyncThunk(
 "user/requestDeleteTodo",
 async function (action: any, { dispatch }) {
       const { id } = action
       const todos =  await JSON.parse(localStorage.getItem("todos"));
       const updateTodos =  todos.filter(todo => todo.id !== id)
       localStorage.setItem("todos", JSON.stringify(updateTodos));
       dispatch(addTodo(updateTodos));
 }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "",
    error: "",
  },
  reducers: {
    addTodo(state, action) {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchGetTodos.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(fetchGetTodos.rejected, (state) => {
      state.status = "reject";
      state.error = "error";
    });
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
