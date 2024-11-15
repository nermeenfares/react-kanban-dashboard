import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MemberProvider } from './context/MemberContext.tsx'

createRoot(document.getElementById('root')!).render(
  <MemberProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </MemberProvider>
)
