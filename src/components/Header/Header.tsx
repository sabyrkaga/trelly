import { PageTitle } from "../PageTitle"
import { ResetButton } from "../ResetButton"

interface Props {
  resetSelection: () => void
}

export const Header = ({ resetSelection }: Props) => {
  return (
    <header>
      <PageTitle />
      <ResetButton resetSelection={resetSelection} />
    </header>
  )
}
