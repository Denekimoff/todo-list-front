import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { addLazyTodo, addTodo, fetchPostTodos } from '../../store/slices/todosSlice';
import useNavigatorOnline from 'use-navigator-online';
import moment from 'moment';
import './index.scss';

export const FormCreate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, isOffline, backOnline } = useNavigatorOnline();
  const { lazyTodos } = useSelector((state: RootState) => state.todos);

  const [title, setTitle] = useState('');
  const handlerOnChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handlerOnSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id: Math.random(),
      title,
      isDone: false,
      date: moment().format('HH:mm:ss DD.MM.YYYY'),
    };
    setTitle('');
    dispatch(addTodo(formData));
    if (isOnline) dispatch(fetchPostTodos(formData));
    if (isOffline) dispatch(addLazyTodo(formData));
  };

  useEffect(() => {
    if(lazyTodos.length) dispatch(fetchPostTodos(lazyTodos))
  }, [backOnline]);

  return (
    <form className='form-create' onSubmit={handlerOnSubmit}>
      <label htmlFor="title">Напишите задачу:
      <input className='field-title' name='title' type="text" value={title} onChange={handlerOnChangeTitle}/>
      </label>
      <button className='button-sbmt' type="submit">Создать</button>
    </form>
  )
};
