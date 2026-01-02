import { TaskDetails } from '../TaskDetails'
import { TaskList } from '../TaskList'

interface Props {
  setSelectedTaskId: (id: string | null) => void
  setBoardId: (id: string | null) => void
  selectedTaskId: string | null
}

export const MainContent = ({
  setSelectedTaskId,
  setBoardId,
  selectedTaskId,
}: Props) => {
  return (
    <main style={{ display: 'flex', columnGap: '30px' }}>
      <TaskList
        setSelectedTaskId={setSelectedTaskId}
        setBoardId={setBoardId}
        selectedTaskId={selectedTaskId}
      />
      <TaskDetails />
    </main>
  )
}
