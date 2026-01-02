import { useEffect, useState } from 'react'
import type { GlobalTaskListItemJsonApi } from '../../types'

interface Props {
  setSelectedTaskId: (id: string | null) => void
  setBoardId: (id: string | null) => void
  selectedTaskId: string | null
}

export const TaskList = ({ setSelectedTaskId, setBoardId, selectedTaskId }: Props) => {
  const [tasks, setTasks] = useState<GlobalTaskListItemJsonApi[] | null>(null)

  useEffect(() => {
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'api-key': import.meta.env.VITE_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((json) => setTasks(json.data))
  }, [])

  const priorities = ['#fff', '#ffd7b5', '#ffb38a', '#ff9248', '#ff6700']

  return (
    <>
      {tasks === null && <p>Загрузка...</p>}
      {tasks?.length === 0 && <p>Задачи отсутствуют</p>}
      <ul>
        {tasks?.map((task) => (
          <li
            key={task.id}
            style={{
              backgroundColor: `${priorities[task.attributes.priority]}`,
              border: `1.5px solid ${
                task.id === selectedTaskId ? '#646cff' : '#242424'
              }`,
            }}
            onClick={() => {
              setSelectedTaskId(task.id)
              setBoardId(task.attributes.boardId)
            }}
          >
            <div>
              <strong>Заголовок: </strong>
              <span
                style={{
                  textDecorationLine: `${
                    task.attributes.status === 2 ? 'line-through' : 'none'
                  }`,
                }}
              >
                {task.attributes.title}
              </span>
            </div>
            <div>
              <strong>Статус: </strong>
              <input
                type="checkbox"
                checked={task.attributes.status === 2}
                readOnly
              />
            </div>
            <div>
              <strong>Дата создания задачи: </strong>
              <span>
                {new Date(task.attributes.addedAt).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
