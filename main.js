const tasks = [
  { title: 'Купить продукты на неделю', isDone: false },
  { title: 'Полить цветы', isDone: true },
  { title: 'Сходить на тренировку', isDone: false },
]

const rootElement = document.querySelector('#root')

const titleElement = document.createElement('h1')
const taskListElement = document.createElement('ul')

titleElement.textContent = 'Список задач'

tasks.forEach((task) => {
  const taskElement = document.createElement('li')
  const taskTitleElement = document.createElement('div')
  const taskStatusElement = document.createElement('input')

  taskTitleElement.textContent = task.title

  taskStatusElement.type = 'checkbox'
  taskStatusElement.checked = task.isDone

  taskElement.append(taskTitleElement, taskStatusElement)
  taskListElement.append(taskElement)
})

rootElement.append(titleElement, taskListElement)