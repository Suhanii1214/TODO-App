import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    filterStatus: "all",
    todoList: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
        },
        deleteTodo: (state, action) => {
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
                state.todoList = state.todoList.map((todo) => {
                    if(todo.id === action.payload.id) {
                        todo.title = action.payload.title
                        todo.status = action.payload.status
                    } 
            })
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload
        }
    }
})

export const {addTodo, deleteTodo, updateTodo, updateFilterStatus} = todoSlice.actions
export default todoSlice.reducer