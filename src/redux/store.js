import { configureStore } from "@reduxjs/toolkit"
import todosReducer from './dotosSlice'

export const store = configureStore({
    reducer:{
        todos: todosReducer
    }
})

