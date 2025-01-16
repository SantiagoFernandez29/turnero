import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

function App() {

  return (
    <div className='font-sans'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='bottom-center' />
      </QueryClientProvider>
    </div>
  )
}

export default App
