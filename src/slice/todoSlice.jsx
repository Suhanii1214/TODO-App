import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
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
            if(todoList) {
                state.todoList.forEach((todo) => {
                    if(todo.id === action.payload.id) {
                        todo.title = action.payload.title
                        todo.status = action.payload.status
                    } 
                })
            }
        }
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions
export default todoSlice.reducer