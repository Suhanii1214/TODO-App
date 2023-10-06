import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {addTodo, updateTodo} from "../slice/todoSlice"
import toast from "react-hot-toast";
import { v4 as uuid } from 'uuid';
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const dropIn = {
    hidden: {
      opacity: 0,
      transform: 'scale(0.9)',
    },
    visible: {
      transform: 'scale(1)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  };

export const TodoModal = ({type, todo, showModal, setShowModal}) => { 

    const[title, setTitle] = useState("");
    const[status, setStatus] = useState("Incomplete")
    const dispatch = useDispatch()

    useEffect(() => {
        if(type === "update" && todo) {
            setTitle(todo.title)
            setStatus(todo.status)
        } else {
            setTitle("")
            setStatus("Incomplete")
        }
    },[type, todo, showModal])

    function submitHandler(e) {
        e.preventDefault()

        if(title === "") {
            toast.error("Please enter a title")
            return;
        }

        if(title && status) {

            if(type === "add") {
            dispatch(addTodo({
                id: uuid(),
                title, 
                status, 
                time: new Date().toLocaleString(),
            })) 
            toast.success('Task Added Successfully')  
            setShowModal(false)
            }
            if(type === "update") {
                if(todo.title !== title || todo.status !== status) {
                   dispatch(updateTodo({
                    ...todo,
                    title,
                    status,
                   })) 
                } else {
                    toast.error("No changes made")
                    return;
                }
            }
            setShowModal(false)
        }
    }
    
    return <AnimatePresence>
    {(showModal) && 
    <motion.div 
    initial = {{opacity: 0}}
    animate = {{opacity: 1}}
    exit={{opacity: 0}}
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper">
        <motion.div 
        variants = {dropIn}
        initial = "hidden"
        animate = "visible"
        exit = "exit"
        className="w-[600px] flex flex-col">
            <motion.button
            initial={{top: 40, opacity: 0}}
            animate={{top: -10, opacity: 1}} 
            exit = {{top: 40, opacity:0}}
            className="text-white font-bold py-2 px-2 place-self-end bg-red-600 rounded-sm"
            onClick={() => setShowModal(false)}
            >X</motion.button>
            <div className="p-2 bg-slate-100 rounded">
            <div className="p-4 w-full">
                <h1 className="text-xl text-gray-500 font-semibold mb-5">
                {type === 'update' ? "Update" : "Add"} Task
                </h1>

                <form onSubmit={(e) => submitHandler(e)}>
                    <label className="font-semibold text-gray-500">Title</label>
                    <input
                    value={title}
                    type="text"
                    placeholder="Enter Task.."
                    className="block w-full rounded-md border-0 py-3 mb-5 pl-2 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="font-semibold text-gray-500">Status</label>
                    <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="relative w-full cursor-default rounded-md bg-white mb-5 py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6">
                    <option className="bg-white">Incomplete</option>
                    <option className="bg-white">Complete</option>
                    </select>
                    <div className="flex justify-start">
                    <button 
                        type="submit"
                        className="py-2 px-5 mx-3 bg-purple-600 hover:bg-purple-800 text-white text-base font-semibold rounded-md">
                        {type === "update" ? "Update" : "Add"} Task
                    </button>
                    <button onClick = {() => {setShowModal(false)}} className="py-2 px-5 mx-3 bg-slate-400 hover:bg-red-600 text-black hover:text-white text-base font-semibold rounded-md">Cancel</button>
                    </div>
                </form>
            </div>
            </div>
        </motion.div>
    </motion.div>
    }
    </AnimatePresence>
}