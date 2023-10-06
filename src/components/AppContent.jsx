import React from "react";
import { useSelector } from "react-redux";
import { TodoItem } from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: {opacity:1},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const child = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y:0,
    opacity: 1,
  } 
}

export const AppContent = () => {
    const todos = useSelector(state => state.todoList)
    const filterStatus = useSelector((state) => state.filterStatus)

    console.log(todos);

    const sortedTodoList = [...todos];
    sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time));

    const filteredTodoList = sortedTodoList.filter(item => {
      if(filterStatus === 'all') {
        return true
      }
      return item.status === filterStatus;
    })

    return <motion.div
    variants={container}
    initial = "hidden"
    animate = "visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length>0
          ? (filteredTodoList.map((todo) => (
            <TodoItem key={todo.id} todo = {todo}/>
          ))
          ) 
          : (<div className="bg-gray-200 px-5 py-4 mx-20 rounded-md">
          <motion.p
            className=" bg-gray-400 py-3 mx-96 rounded-md text-gray-600 text-2xl text-center font-bold"
            variants={child}
          >No Todo Found</motion.p>
          </div>
        )}
      </AnimatePresence>   
    </motion.div>
}

//${todo.status === "Complete" ? "line-through" : ""}