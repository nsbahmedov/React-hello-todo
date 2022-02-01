import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('todos')) === null 
                        ? [] 
                        : JSON.parse(localStorage.getItem('todos'))


export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers : {
        addNewTodo: {
            reducer : (state, action) => {
                state.push(action.payload)
                const allTodos = JSON.parse(localStorage.getItem('todos')) === null 
                ? [] 
                : JSON.parse(localStorage.getItem('todos'))
                allTodos.push(action.payload)
                localStorage.setItem('todos', JSON.stringify(allTodos))
            },

            prepare: (text, level) => {
                const id = nanoid();
                return {
                    payload: {
                        id,
                        text,
                        level
                    }
                }
            }
        },

        removeTodo : (state, action) => {
            let removable = action.payload
            state.splice(removable, 1)

            const locals = JSON.parse(localStorage.getItem('todos'))
            locals.splice(removable, 1)
            localStorage.setItem('todos', JSON.stringify(locals))
        }
    }
})


export const {addNewTodo, removeTodo} = todoSlice.actions

export const getAllTodos = (state) => state.todos


export default todoSlice.reducer