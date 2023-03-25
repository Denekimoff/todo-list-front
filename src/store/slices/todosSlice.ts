import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PATHDOMAIN } from "../../constants";
import { httpRequest } from "../../httpRequests";

export const fetchGetTodos = createAsyncThunk(
 "user/fetchGetTodos",
 async function (_, { dispatch }) {
   try {
    const response: Response = await fetch(`${PATHDOMAIN}/todos/`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
     const data = await response.json();
     localStorage.setItem("todos", JSON.stringify(data));
     dispatch(addTodo(data));
   } catch (error) {
     console.log(error.message)
   }
 }
);

export const fetchPostTodos = createAsyncThunk(
  "user/fetchAddTodo",
  async function (_, { dispatch }) {
    const currentTodos = localStorage.getItem("todos");
    console.log('todos fetch todos', currentTodos);
    try {
      const response: Response = await fetch(`${PATHDOMAIN}/todos/post`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: currentTodos,
      });
      const data = await response.json();
    } catch (error){
      alert(error.message);
      }
  }
);

export const requestAddTodo = createAsyncThunk(
 "user/requestAddTodo",
 async function (action: any, { dispatch }) {
      const todos =  await JSON.parse(localStorage.getItem("todos"));
      console.log(todos, 'стырый массив')
      todos.push(action)
      console.log(todos, 'новый массив')
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log(localStorage.getItem('todos'))
      dispatch(addTodo(todos));
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
       const updateTodos =  todos.filter(todo => todo._id !== id)
       console.log(todos, 'ДО УДАЛЕНИЯ')
       console.log(updateTodos, 'ПОСЛЕ УДАЛЕНИЯ')
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
