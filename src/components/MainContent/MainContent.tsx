import { TaskDetails } from "../TaskDetails"
import { TaskList } from "../TaskList"

export const MainContent = () => {
  return (
    <main>
      <TaskList />
      <TaskDetails />
    </main>
  )
}
