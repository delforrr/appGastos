import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'
import { MovementsContextProvider } from './context/MovementsContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <MovementsContextProvider>
          <App />
        </MovementsContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

