import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {addTodo} from "../slice/todoSlice"
import toast from "react-hot-toast";

export const AddTaskModal = ({isVisible, onClose}) => {

    if(!isVisible) return null

    const[title, setTitle] = useState("");
    const[status, setStatus] = useState("Incomplete")
    const dispatch = useDispatch()

    function addTodoHandler(e) {
        e.preventDefault()
        if(title && status) {
        dispatch(addTodo({
            title, 
            status, 
            time: new Date().toLocaleString(),}))
        toast.success('Task Added Successfully')  
        onClose();  
    } else {
        toast.error("Empty Fields!")
    }
}
    
    return <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper">
        <div className="w-[600px] flex flex-col">
            <button 
            className="text-white font-bold py-2 px-2 place-self-end bg-red-600 rounded-sm"
            onClick={() => onClose()}
            >X</button>
            <div className="p-2 bg-slate-100 rounded">
            <div className="p-4 w-full">
                <h1 className="text-xl text-gray-500 font-semibold mb-5">Add Task</h1>

                <form onSubmit={(e) => addTodoHandler(e)}>
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
                    className="py-2 px-5 mx-3 bg-purple-600 hover:bg-purple-800 text-white text-base font-semibold rounded-md">Add</button>
                    <button className="py-2 px-5 mx-3 bg-slate-400 hover:bg-red-600 text-black hover:text-white text-base font-semibold rounded-md">Cancel</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
}