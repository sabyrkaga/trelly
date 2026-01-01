import { useEffect, useState } from 'react'

interface GlobalTaskListItemDto {
  title: string
  status: number
  priority: number
  addedAt: string
}

interface GlobalTaskListItemJsonApi {
  id: string
  attributes: GlobalTaskListItemDto
}

export const App = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
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

  if (tasks === null) {
    return (
      <>
        <h1>Список дел</h1>
        <div>Загрузка...</div>
      </>
    )
  }

  if (tasks.length === 0) {
    return (
      <>
        <h1>Список дел</h1>
        <div>Задачи отсутствуют</div>
      </>
    )
  }

  const priorities = ['#fff', '#ffd7b5', '#ffb38a', '#ff9248', '#ff6700']

  return (
    <>
      <h1>Список дел</h1>
      <button onClick={() => setSelectedTaskId(null)}>
        Сбросить выделение
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              backgroundColor: `${priorities[task.attributes.priority]}`,
              border: `1.5px solid ${
                task.id === selectedTaskId ? '#646cff' : '#242424'
              }`,
            }}
            onClick={() => setSelectedTaskId(task.id)}
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
              <span>{task.attributes.addedAt}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
