import { createSlice } from "@reduxjs/toolkit"

//DECLARAR ESTADO INICIAL

const initialState = {
    todos: []
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    //Funciones que va a manejar los estados de nuestras variables
    reducers: {
        setTodosReducer: (state, action) => {
            state.todos = action.payload
        },
        addTodoReducer: (state, action) => {
            state.todos.push(action.payload)
        },
        hideCompletedReducer: (state) => {
            state.todos = state.todos.filter(todo => !todo.isCompleted)
        },
        updateReducer: (state, action) => {
            console.log(action);
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    todo.isCompleted = !todo.isCompleted
                }
                return todo
            })
        },
        deleteReducer: (state, action) => {
            const id = action.payload
            const todos = state.todos.filter(todo => todo.id !== id)
            state.todos = todos
        },
    }
})

export const {
    setTodosReducer,
    addTodoReducer,
    hideCompletedReducer,
    updateReducer,
    deleteReducer
} = todosSlice.actions

export default todosSlice.reducer
