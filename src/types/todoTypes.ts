export interface todosInitialState {
  todos: ITodo[];
  lazyTodos: ITodo[];
  status: string;
  error: string;
}

export interface ITodo {
  id: number;
  title: string;
  isDone: boolean;
  date: string;
  _id?: string;
}
