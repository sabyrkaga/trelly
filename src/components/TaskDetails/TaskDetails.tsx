import { useEffect, useState } from 'react'
import type { TaskDetailsData } from '../../types'

interface Props {
  boardId: string | null
  selectedTaskId: string | null
  selectedTask: TaskDetailsData | null
  setSelectedTask: (task: TaskDetailsData | null) => void
}

export const TaskDetails = ({
  boardId,
  selectedTaskId,
  selectedTask,
  setSelectedTask,
}: Props) => {
  const [isTaskLoading, setIsTaskLoading] = useState<boolean>(false)

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

  return (
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
  )
}
