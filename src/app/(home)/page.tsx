import Board from "../components/Board/Board";
import Header from "../layout/Header/Header";
import { getBoardData } from "../actions";
import { BoardData } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Ваша главная рабочая область."
}

export default async function Home() {

  const data: BoardData = await getBoardData()

  return (
    <div className="grid gap-5">
      <Header boardData={data}/>
      <Board boardData={data}/>
    </div>
  );
}
