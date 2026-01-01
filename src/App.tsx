import { useState } from 'react'

export const App = () => {
  const tasks = [
    {
      id: 1,
      title: 'Купить продукты на неделю',
      isDone: false,
      addedAt: '1 сентября',
      priority: 2,
    },
    {
      id: 2,
      title: 'Полить цветы',
      isDone: true,
      addedAt: '2 сентября',
      priority: 0,
    },
    {
      id: 3,
      title: 'Сходить на тренировку',
      isDone: false,
      addedAt: '3 сентября',
      priority: 1,
    },
    {
      id: 4,
      title: 'Срочно отправить рабочий отчет',
      isDone: false,
      addedAt: '4 сентября',
      priority: 4,
    },
    {
      id: 5,
      title: 'Заплатить за коммунальные услуги',
      isDone: false,
      addedAt: '3 сентября',
      priority: 3,
    },
  ]

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

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
              backgroundColor: `${priorities[task.priority]}`,
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
                    task.isDone ? 'line-through' : 'none'
                  }`,
                }}
              >
                {task.title}
              </span>
            </div>
            <div>
              <strong>Статус: </strong>
              <input type="checkbox" checked={task.isDone} readOnly />
            </div>
            <div>
              <strong>Дата создания задачи: </strong>
              <span>{task.addedAt}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
