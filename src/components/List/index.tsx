import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchGetTodos } from '../../store/slices/todosSlice'
import { Todo } from '../Todo'

export const List = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchGetTodos())
  }, [])
  const { todos } = useSelector((state: RootState) => state.todos)
  return (
    <div className='list'>
      <h2>Список дел:</h2>
      {todos ? todos.map(todo => <Todo />) : <h4>У вас нет актуальных задач.</h4>}
      {/* <Todo /> */}
    </div>
  )
}
