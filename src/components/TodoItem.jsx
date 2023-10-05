import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const TodoItem = () => {
    const todos = useSelector(state => state.todoList)
    const sortedTodoList = [...todos];
    sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time));

    return <>
        <ul className="list-none">
        {todos.map((todo) => {
            <li key={todo.id}>
                <div className="py-4 px-3 bg-purple-200 mx-60 rounded-lg">
                    <div className="py-2 px-1 bg-white font-semibold rounded-lg">
                     {todo.title}
                     <p>{todo.time}</p>
                    </div>
                </div>
            </li>
        })}
        </ul>
    </>
}