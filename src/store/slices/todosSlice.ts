import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PATHDOMAIN } from "../../constants";
import { todosInitialState } from "../../types/todoTypes";

export const fetchGetTodos = createAsyncThunk(
 "todos/fetchGetTodos",
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
     dispatch(getTodos(data));
   } catch (error) {
     console.log(error.message)
   }
 }
);

export const fetchPostTodos = createAsyncThunk(
  "todos/fetchPostTodos",
  async function (action: any, { dispatch }) {
    try {
      const response: Response = await fetch(`${PATHDOMAIN}/todos/post`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(action),
      });
      const data = await response.json();
      console.log(data)
      dispatch(getTodos(data));
    } catch (error){
      console.log(error.message);
      }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    lazyTodos: [],
    status: "",
    error: "",
  },
  reducers: {
    getTodos(state: todosInitialState, action) {
      state.todos = action.payload
    },
    addTodo(state: todosInitialState, action) {
      state.todos.push(action.payload);
    },
    deleteTodo(state: todosInitialState, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    setTitleTodo(state: todosInitialState, action) {
      const editTitleTodo = state.todos.find(todo => todo.id === action.payload.id)
      editTitleTodo.title = action.payload.newTitle
    },
    setCheckedTodo(state: todosInitialState, action) {
      const toggleCheckTodo = state.todos.find(todo => todo.id === action.payload.id)
      toggleCheckTodo.isDone = !toggleCheckTodo.isDone
    },
    addLazyTodo(state: todosInitialState, action) {
      state.lazyTodos.push(action.payload)
    }
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

export const { getTodos, addTodo, deleteTodo, setTitleTodo, setCheckedTodo, addLazyTodo } = todosSlice.actions;
export default todosSlice.reducer;
