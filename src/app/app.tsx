import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import TodoTable from '../widgets/todo-table.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoTable />
  </StrictMode>,
)
