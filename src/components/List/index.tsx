import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Todo } from '../Todo'
import './index.scss';

export const List = () => {
  const { todos } = useSelector((state: RootState) => state.todos)

  return (
    <div className='list'>
      <h2>Список ваших задач:</h2>
      {todos ? (
        todos.map(todo => (<Todo key={todo.id} {...todo}/>))) : (
        <h4>У вас нет актуальных задач.</h4>)
      }
    </div>
  )
}
