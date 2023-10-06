import React, {useEffect, useState} from "react";
import { TodoModal } from "./TodoModal";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slice/todoSlice";
import { CheckBox } from "./CheckBox";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { format } from 'date-fns';

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

export const TodoItem = ({todo}) => {
    const [updateModal, setUpdateModal] = useState(false)
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(todo.status === "Complete") {
            setChecked(true)
        } else {
            setChecked(false)
        }
    },[todo.status])

    function handleDelete() {
        dispatch(deleteTodo(todo.id))
        toast.success("Todo Deleted Successfully")
    }
  
    function handleUpdate() {
        setUpdateModal(true)
    }

    function handleCheck() {
      setChecked(!checked)
      dispatch(updateTodo({
        ...todo,
        status: checked? 'Incomplete' : 'Complete'})
      )
    }

    return <>
    <motion.div
    variants={child}
    className="py-4 px-3 mb-3 shadow-md bg-purple-200 mx-60 rounded-lg">
    <div className= {`flex flex-row py-2 px-2 bg-white font-semibold rounded-lg`}>
      <CheckBox checked = {checked} handleCheck={handleCheck}/>
      <div className= {`flex flex-col ${todo.status === "Complete" ? "line-through" : ""}`}>
        <div>{todo.title}</div> 
        <p className="text-sm">
          {todo.time}
          {format(new Date(todo.time), 'p, MM/dd/yyyy')}
        </p> 
      </div>
      <div className="flex flex-row justify-items-end align-bottom">
        <button 
          onClick= {() => handleUpdate()}
          className="py-1 px-2 mx-1 bg-slate-200 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z"/></svg>
        </button>
        <button 
          onClick={() => handleDelete()}
          className="py-1 px-2 mx-1 bg-slate-200 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
      </div>   
    </div>
  </motion.div>

  <TodoModal type="update" todo = {todo} showModal={updateModal} setShowModal={setUpdateModal}/>
  </>
}