export const App = () => {
  const tasks = [
    {
      id: 1,
      title: 'Купить продукты на неделю',
      isDone: false,
      addedAt: '1 сентября',
    },
    {
      id: 2,
      title: 'Полить цветы',
      isDone: true,
      addedAt: '2 сентября',
    },
    {
      id: 3,
      title: 'Сходить на тренировку',
      isDone: false,
      addedAt: '3 сентября',
    },
  ]

  return (
    <>
      <h1>Список дел</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div>
              <strong>Заголовок: </strong>
              <span>{task.title}</span>
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
