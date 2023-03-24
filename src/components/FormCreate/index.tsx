import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../../store';
import { requestAddTodo } from '../../store/slices/todosSlice';

export const FormCreate = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('')
  const handlerOnChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const [isChecked, setIsChecked] = useState(false)
  const handlerOnChangeChecked = () => {
    setIsChecked(prev => !prev)
  }
  const handlerOnSubmit = (event) => {
    event.preventDefault()
    const formData = {
      id: uuidv4(),
      title,
      check: isChecked,
    }
    console.log(formData)
    dispatch(requestAddTodo(formData))
  }
  return (
    <form className='form-create' onSubmit={handlerOnSubmit}>
      <input type="text" value={title} onChange={handlerOnChangeTitle}/>
      <input type="checkbox" checked={isChecked} onChange={handlerOnChangeChecked} />
      <button type="submit">CREATE</button>
    </form>
  )
}
