import { useState } from 'react'
import { TodoTitle } from './components/TodoTitle'
import { TodoHeader } from './components/TodoHeader'
import {Toaster} from "react-hot-toast"
import { AppContent } from './components/AppContent'

function App() {

  return (
    <>
      <TodoTitle/>
      <TodoHeader/>
      <AppContent/>
      <Toaster 
      position='bottom-right'
      toastOptions={{
        style: {
          fontSize: '1.4rem'
        }
      }}/>
    </>
  )
}

export default App
