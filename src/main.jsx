import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './components/Root'
import Home from './components/Home'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import HeroLogin from './components/HeroLogin'

const router =createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/heroLogin',
        element:<HeroLogin/>
      }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
