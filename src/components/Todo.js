import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import CheckBox from "./CheckBox"
import moment from "moment/moment"
import { MaterialIcons } from '@expo/vector-icons'
import { deleteReducer } from "../redux/dotosSlice";
import { useDispatch, useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Todo = ({
    id,
    name,
    isCompleted,
    isToday,
    hour
}) => {
    const [localHour, setLocalHour] = useState(new Date(hour))

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.todos)

    const handleTodoDelete = async () => {
        dispatch(deleteReducer(id))
        try {
            AsyncStorage.setItem('@Todos', JSON.stringify(
                todos.filter(todo => todo.id !== id)
            ))
            console.log('Todo deleted correctly');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox id={id} isCompleted={isCompleted} isToday={isToday} />
                <View>
                    <Text style={
                        isCompleted
                            ? [styles.text, { textDecorationLine: 'line-through', color: '#73737330' }]
                            : [styles.text]
                    }>{name}</Text>
                    <Text style={
                        isCompleted
                            ? [styles.time, { textDecorationLine: 'line-through', color: '#73737330' }]
                            : [styles.time]
                    }>{moment(localHour).format('LT')}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleTodoDelete}>
                <MaterialIcons name="delete-outline" size={24} color='#73737330'></MaterialIcons>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#737373'
    },
    time: {
        fontSize: 13,
        color: '#a3a3a3',
        fontWeight: '500'
    }
})

export default Todo
