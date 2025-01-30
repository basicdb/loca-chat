import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BasicProvider } from '@basictech/react'
import { schema } from '../basic.config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BasicProvider project_id={schema.project_id} schema={schema} debug>
      <App />
    </BasicProvider>
  </StrictMode>,
)
