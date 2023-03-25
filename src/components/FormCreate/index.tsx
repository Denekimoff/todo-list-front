import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../../store';
import { fetchPostTodos, requestAddTodo } from '../../store/slices/todosSlice';
import moment from 'moment';
import './index.scss';

export const FormCreate = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('')
  const handlerOnChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  // const [isChecked, setIsChecked] = useState(false)
  // const handlerOnChangeChecked = () => {
  //   setIsChecked(prev => !prev)
  // }

  const handlerOnSubmit = (event) => {
    event.preventDefault()
    const formData = {
      id: uuidv4(),
      title,
      check: false,
      date: moment().format('HH:mm:ss DD.MM.YYYY')
    }
    dispatch(requestAddTodo(formData))
    dispatch(fetchPostTodos())
    console.log(event.form)
  }

  return (
    <form className='form-create' onSubmit={handlerOnSubmit}>
      <label htmlFor="title">Напишите задачу:
      <input className='field-title' name='title' type="text" value={title} onChange={handlerOnChangeTitle}/>
      </label>
      {/* <input className='field-check' type="checkbox" checked={isChecked} onChange={handlerOnChangeChecked} /> */}
      <button className='button-sbmt' type="submit">Создать</button>
    </form>
  )
}
