import { useEffect, useState } from 'react'
import type { GlobalTaskListItemJsonApi } from '../../types'
import { Task } from '../Task/Task'

interface Props {
  setSelectedTaskId: (id: string | null) => void
  setBoardId: (id: string | null) => void
  selectedTaskId: string | null
}

export const TaskList = ({
  setSelectedTaskId,
  setBoardId,
  selectedTaskId,
}: Props) => {
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
          <Task
            key={task.id}
            task={task}
            setSelectedTaskId={setSelectedTaskId}
            setBoardId={setBoardId}
            selectedTaskId={selectedTaskId}
            priorities={priorities}
          />
        ))}
      </ul>
    </>
  )
}
