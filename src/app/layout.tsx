import type { Metadata } from "next"
import './globals.css'
import AppSetup from "./hooks/useTabNavigation/useTabNavigation";

export const metadata: Metadata = {
  title: {
    default: "Kanban Board", 
    template: "Kanban Board | %s",
  },
  description: "Интерактивный таск-менеджер и Канбан-доска. Визуализируйте рабочий процесс, распределяйте задачи по колонкам с Drag-and-Drop и контролируйте свои проекты.",
  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Kanban Board — Визуальный Таск-Менеджер",
    description: "Управляйте проектами эффективно. Попробуйте удобную Канбан-доску с поддержкой Drag-and-Drop.",
    url: "https://vercel.app",
    siteName: "Kanban Board Application",
    locale: "ru_RU", 
    type: "website",
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className='h-full antialiased'
    >
      <body className="min-h-full flex flex-col">
        <AppSetup/>
        {children}
      </body>
    </html>
  );
}
