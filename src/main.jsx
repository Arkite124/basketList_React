import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ModalProvider} from "./Provider/ModalProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ModalProvider>
      <App />
      </ModalProvider>
  </StrictMode>,
)
