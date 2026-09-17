import KanbanWorkspace from "../components/KanbanWorkspace/KanbanWorkspace";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Ваша главная рабочая область."
}

export default function Home() {

  return (
    <div className="grid gap-5">
      <KanbanWorkspace/>
    </div>
  )
}
