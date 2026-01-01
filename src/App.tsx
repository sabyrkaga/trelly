import { useEffect, useState } from 'react'

interface TaskDetailsDto {
  title: string
  description: string
  boardTitle: string
}

interface GlobalTaskListItemDto {
  title: string
  status: number
  priority: number
  addedAt: string
  boardId: string
}

interface TaskDetailsData {
  attributes: TaskDetailsDto
}

interface GlobalTaskListItemJsonApi {
  id: string
  attributes: GlobalTaskListItemDto
}

export const App = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null)
  const [boardId, setBoardId] = useState<string | null>(null)
  const [isTaskLoading, setIsTaskLoading] = useState<boolean>(false)
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

  useEffect(() => {
    if (!boardId || !selectedTaskId) return

    setIsTaskLoading(true)
    setSelectedTask(null)

    fetch(
      `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${selectedTaskId}`,
      {
        headers: {
          'api-key': import.meta.env.VITE_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setSelectedTask(json.data))
      .finally(() => setIsTaskLoading(false))
  }, [boardId, selectedTaskId])

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
      <button
        onClick={() => {
          setSelectedTaskId(null)
          setBoardId(null)
          setSelectedTask(null)
        }}
      >
        Сбросить выделение
      </button>
      <div style={{ display: 'flex', columnGap: '30px' }}>
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
        <div>
          <h2>Task details</h2>
          {!selectedTaskId && <p>Task is not selected</p>}
          {selectedTaskId && isTaskLoading && <p>Loading...</p>}
          {selectedTask && (
            <div>
              <p>Title: {selectedTask?.attributes.title}</p>
              <p>
                Description:{' '}
                {selectedTask?.attributes.description || 'No description'}
              </p>
              <p>Board Title: {selectedTask?.attributes.boardTitle}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
