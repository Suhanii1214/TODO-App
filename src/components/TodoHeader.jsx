import React, { useState } from "react";
import { AddTaskModal  } from "./AddTaskModal";

export const TodoHeader = () => {
    const [showModal, setShowModal] = useState(false)

    return <>
        <div className="flex flex-row items-center justify-around p-5">
            <button 
            className="py-3 px-4 bg-purple-600 hover:bg-purple-800 text-white text-xl font-semibold rounded-md"
            onClick={() => setShowModal(true)}
            >Add Task</button>
            <select className="bg-slate-400 border-black py-3 px-4 rounded-md font-semibold text-xl">
                <option className="bg-white">All</option>
                <option className="bg-white">Complete</option>
                <option className="bg-white">Incomplete</option>
            </select>
        </div>
        <AddTaskModal isVisible = {showModal} onClose={() => setShowModal(false)}/>
    </>
}