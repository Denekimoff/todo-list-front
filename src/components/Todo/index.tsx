import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchPostTodos, requestDeleteTodo } from '../../store/slices/todosSlice';
import './index.scss';

export const Todo = ({ title, check, date, id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const handerOnDeleteTodo = () => {
    dispatch(requestDeleteTodo(id))
    dispatch(fetchPostTodos())
  }
  return (
    <div className='todo'>
      <h3>{title}</h3>
      {/* <p>{moment(date).fromNow()}</p> */}
      <div className="todo-setting">
        <input type="checkbox" checked={check} onChange={() => !check}/>
        <button onClick={handerOnDeleteTodo}>X</button>
      </div>
    </div>
  )
}
