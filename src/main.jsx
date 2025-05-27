import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ModalProvider} from "./Provider/ModalProvider.jsx";
import './fontAwesome';
import {LoginProvider} from "./Provider/LoginProvider.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
          <ModalProvider>
              <App/>
          </ModalProvider>
      </LoginProvider>
    </QueryClientProvider>
)
