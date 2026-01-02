import type { TaskDetailsData } from '../../types'
import { TaskDetails } from '../TaskDetails'
import { TaskList } from '../TaskList'

interface Props {
  boardId: string | null
  selectedTask: TaskDetailsData | null
  selectedTaskId: string | null
  setBoardId: (id: string | null) => void
  setSelectedTask: (task: TaskDetailsData | null) => void
  setSelectedTaskId: (id: string | null) => void
}

export const MainContent = ({
  boardId,
  selectedTask,
  selectedTaskId,
  setBoardId,
  setSelectedTask,
  setSelectedTaskId,
}: Props) => {
  return (
    <main style={{ display: 'flex', columnGap: '30px' }}>
      <TaskList
        setSelectedTaskId={setSelectedTaskId}
        setBoardId={setBoardId}
        selectedTaskId={selectedTaskId}
      />
      <TaskDetails
        boardId={boardId}
        selectedTaskId={selectedTaskId}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </main>
  )
}
