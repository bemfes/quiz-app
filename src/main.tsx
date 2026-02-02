import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { ErrorBoundary } from 'react-error-boundary'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<p>Sorry, it looks like an unexpected error has occurred.</p>}>
    <StrictMode>
      <Provider store={store}><App /></Provider>
    </StrictMode>
  </ErrorBoundary>,
)
