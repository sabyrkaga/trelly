import { useState } from 'react'
import { Header } from '../Header'
import { MainContent } from '../MainContent'
import type { TaskDetailsData } from '../../types'

export const MainPage = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null)
  const [boardId, setBoardId] = useState<string | null>(null)

  const handleResetSelection = () => {
    setSelectedTaskId(null)
    setBoardId(null)
    setSelectedTask(null)
  }

  return (
    <main>
      <Header resetSelection={handleResetSelection} />
      <MainContent />
    </main>
  )
}
