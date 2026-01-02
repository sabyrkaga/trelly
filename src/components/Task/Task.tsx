import type { GlobalTaskListItemJsonApi } from "../../types"

interface Props {
  task: GlobalTaskListItemJsonApi
  setSelectedTaskId: (id: string | null) => void
  setBoardId: (id: string | null) => void
  selectedTaskId: string | null
  priorities: string[]
}

export const Task = ({ task, setSelectedTaskId, setBoardId, selectedTaskId, priorities }: Props) => {
  return (
    <li
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
        <span>{new Date(task.attributes.addedAt).toLocaleDateString()}</span>
      </div>
    </li>
  )
}
