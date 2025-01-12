import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter(routes)

function App() {

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position='bottom-center' />
    </div>
  )
}

export default App
