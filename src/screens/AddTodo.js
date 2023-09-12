import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Switch, Platform, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
//useDispatch = para poder usar los reducer dentro de este componente
//useSelector = para acceder al estado que tenemos en redux
import { useDispatch, useSelector } from "react-redux";
//Nuestros reducer
import { addTodoReducer } from "../redux/dotosSlice";
//Para guarder los todos
import AsyncStorage from "@react-native-async-storage/async-storage";
//Para navegar en todo la navegación de la aplicación
import { useNavigation } from "@react-navigation/native";

const AddTodo = () => {

    const [task, setTask] = useState('')
    const [date, setDate] = useState(new Date())
    const [isToday, setIsToday] = useState(false)
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    //Acceder al estado de redux (Lita de todos)
    const listTodos = useSelector(state => state.todos.todos)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            name: task,
            hour: date.toString(),
            isToday : isToday,
            isCompleted : false,
        }
        try {
            await AsyncStorage.setItem('@Todos', JSON.stringify([...listTodos, newTodo]))
            dispatch(addTodoReducer(newTodo))
            console.log('Todo saved correctly')
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
    }

    const showPicker = () => {
        setShow(true);
        console.log(show);
    };

    const onChange = (event, value) => {

        const currentDate = value || date
        setShow(false);
        setDate(value);

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDay() + '/' + (tempDate.getTime() + 1) + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime)

        console.log(fDate + '(' + fTime + ')')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            {/* NOMBRE DE LA TAREA */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Task"
                    placeholderTextColor='#00000030'
                    onChangeText={newText => setTask(newText)}
                ></TextInput>
            </View>
            {/* HORA */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Hour</Text>
                <Button
                    title="TimePicker"
                    onPress={showPicker}
                ></Button>
                {show && (
                    <DateTimePicker
                        mode={'time'}
                        display="default"
                        value={date}
                        is24Hour={true}
                        onChange={onChange}
                        style={{ width: '80%' }}
                    ></DateTimePicker>
                )}
            </View>
            {/* PARA HOY */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => { setIsToday(value) }}
                ></Switch>
            </View>
            {/* BOTÓN DE GRABAR */}
            <TouchableOpacity
                style={styles.button}
                onPress={addTodo}
            >
                <Text style={{ color: 'white' }} >Done</Text>
            </TouchableOpacity>
            <Text style={{ color: '#00000060' }}>If you disable today, the task will be considered as tomorrow</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f8fa',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 46,
        borderRadius: 11,
    }
})

export default AddTodo