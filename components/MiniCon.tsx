import { ReactNode } from "react"

interface props{
    children:ReactNode
}
function MiniCon({children,}:props) {
  return (
    <div className="mx-3 sm:mx-6">{children}</div>
  )
}

export default MiniCon