interface Props {
  resetSelection: () => void
}

export const ResetButton = ({ resetSelection }: Props) => {
  return (
    <button
      onClick={() => {
        resetSelection()
      }}
    >
      Сбросить выделение
    </button>
  )
}
