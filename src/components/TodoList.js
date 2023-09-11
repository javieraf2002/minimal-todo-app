import react from "react"
import { FlatList } from "react-native"
import Todo from "./Todo.js"

const TodoList = ({ todosData }) => {
    return (
        <FlatList
            data={todosData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Todo {...item} />}
        />
    )
}

export default TodoList




