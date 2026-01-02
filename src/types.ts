export interface TaskDetailsDto {
  title: string
  description: string
  boardTitle: string
}

export interface GlobalTaskListItemDto {
  title: string
  status: number
  priority: number
  addedAt: string
  boardId: string
}

export interface TaskDetailsData {
  attributes: TaskDetailsDto
}

export interface GlobalTaskListItemJsonApi {
  id: string
  attributes: GlobalTaskListItemDto
}
