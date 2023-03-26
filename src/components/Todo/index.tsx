import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchDeleteTodo, fetchEditTitleTodo, fetchToggleCheckTodo, setTitleTodo } from '../../store/slices/todosSlice';
import './index.scss';

export const Todo = ({ title, isDone, id }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [newTitle, setNewTitle] = useState(title)
  const handlerOnChangeNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const [isEdit, setIsEdit] = useState(false)
  const handlerOnSubmitNewTitle = () => {
    if (isEdit && title !== newTitle) {
      dispatch(setTitleTodo({id, newTitle}))
      dispatch(fetchEditTitleTodo({id, title: newTitle}))
    }
    setIsEdit(prev => !prev)
  }

  const handerOnDeleteTodo = () => {
    dispatch(fetchDeleteTodo({id}))
  }

  const handlerIsCheck = () => {
    dispatch(fetchToggleCheckTodo({id, isDone: !isDone}))
  }

  return (
    <div className={isDone ? 'todo todo--checked' : 'todo'}>
      {isEdit ? (
        <input  className='todo__edit-input' type="text" value={newTitle} onChange={handlerOnChangeNewTitle}/>) : (
        <h3 className={isDone ? `todo__item--checked` : 'todo__item'}>{title}</h3>)
      }
      <div className="todo__setting">
        <button className='todo__button-edit' disabled={isDone} onClick={handlerOnSubmitNewTitle}>
          {isEdit ? 'ok' : 'edit'}
        </button>
        <input type="checkbox" checked={isDone} onChange={handlerIsCheck}/>
        <button className='todo__button-delete' onClick={handerOnDeleteTodo}>X</button>
      </div>
    </div>
  )
}
