import { useState } from 'react'
import { TodoTitle } from './components/TodoTitle'
import { TodoHeader } from './components/TodoHeader'
import { TodoItem } from './components/TodoItem'
import {Toaster} from "react-hot-toast"

function App() {

  return (
    <>
      <TodoTitle/>
      <TodoHeader/>
      <TodoItem/>
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
