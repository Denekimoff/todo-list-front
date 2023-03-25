import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { deleteTodo, setCheckedTodo, setTitleTodo } from '../../store/slices/todosSlice';
import './index.scss';

export const Todo = ({ title, isDone, date, id }) => {
  const dispatch = useDispatch<AppDispatch>()
  // const { todos } = useSelector((state: RootState) => state.todos)

  const [isChecked, setIsChecked] = useState(isDone)

  const [newTitle, setNewTitle] = useState(title)
  const handlerOnChangeNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const [isEdit, setIsEdit] = useState(false)
  const handlerOnSubmitNewTitle = () => {
    setIsEdit(prev => !prev)
    dispatch(setTitleTodo({id, newTitle}))
  }

  const handerOnDeleteTodo = () => {
    dispatch(deleteTodo({id}))
  }

  const handlerIsCheck = () => {
    dispatch(setCheckedTodo({id}))
    setIsChecked(prev => !prev)
  }

  return (
    <div className={isChecked ? 'todo todo--checked' : 'todo'}>
      {isEdit ? (
        <input type="text" value={newTitle} onChange={handlerOnChangeNewTitle}/>) : (
        <h3 className={isChecked ? `todo__item--checked` : 'todo__item'}>{title}</h3>)
      }
      {/* <p>{date}</p> */}
      <div className="todo__setting">
        <button className='todo__button-edit' disabled={isChecked} onClick={handlerOnSubmitNewTitle}>
          {isEdit ? 'ok' : 'edit'}
        </button>
        <input type="checkbox" checked={isDone} onChange={handlerIsCheck}/>
        <button className='todo__button-delete' onClick={handerOnDeleteTodo}>X</button>
      </div>
    </div>
  )
}
