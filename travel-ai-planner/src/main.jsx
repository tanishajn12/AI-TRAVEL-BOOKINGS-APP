import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GenerateItinerary from './generate-itinerary'

const router = createBrowserRouter([
  {
    path : '/',
    element:<App/>
  },
  {
    path:'/generate-itinerary',
    element:<GenerateItinerary/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
