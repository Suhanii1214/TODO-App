import React, { useState } from "react";
import { TodoModal  } from "./TodoModal";
import { useSelector,useDispatch } from "react-redux";
import { updateFilterStatus } from "../slice/todoSlice";

export const TodoHeader = () => {
    const [showModal, setShowModal] = useState(false)

    const filterStatus = useSelector((state) => state.filterStatus)
    const dispatch = useDispatch();

    const updateFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value))
    }

    return <>
        <div className="flex flex-row items-center justify-around p-5">
            <button 
            className="py-3 px-4 bg-purple-600 hover:bg-purple-800 text-white text-xl font-semibold rounded-md"
            onClick={() => setShowModal(true)}
            >Add Task</button>
            <select
            id="status"
            value={filterStatus}
            onChange={updateFilter} 
            className="bg-slate-400 border-black py-3 px-4 rounded-md font-semibold text-xl">
                <option className="bg-white">All</option>
                <option className="bg-white">Complete</option>
                <option className="bg-white">Incomplete</option>
            </select>
        </div>
        <TodoModal type = "add" showModal = {showModal} setShowModal = {setShowModal}/>
    </>
}