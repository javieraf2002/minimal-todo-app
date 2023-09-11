import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import TodoList from "../components/TodoList";
import todosData from "../data/todos.js"

const Home = () => {

    const [localData, SetLocalData] = useState(
        todosData.sort((a, b) => { return a.isCompleted - b.isCompleted })
    )

    const [isHidden, setIsHidden] = useState(false)
    const Navigation = useNavigation()



    const HandleHidePress = () => {
        if (isHidden) {
            setIsHidden(false)
            SetLocalData(todosData.sort((a, b) => { return a.isCompleted - b.isCompleted }))
        } else {
            setIsHidden(!isHidden)
            SetLocalData(localData.filter(todo => !todo.isCompleted))
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/favicon.png')}
                style={styles.image}
            >
            </Image>
            <View style={styles.textToday}>
                <Text style={styles.title}>Today</Text>
                <TouchableOpacity
                    onPress={HandleHidePress}
                >
                    <Text style={{ color: '#3478f6' }}>{isHidden ? 'Show Completed' : 'Hide Completed'}</Text>
                </TouchableOpacity>
            </View>
            {/* TAREAS PARA HOY */}
            <TodoList todosData={localData.filter(todo => todo.isToday)} />
            <Text style={styles.title}>Tomorrow</Text>
            {/* TAREAS PARA MAÑANA */}
            <TodoList todosData={todosData.filter(todo => !todo.isToday)} />
            <TouchableOpacity
                onPress={()=>{Navigation.navigate('Add')}}
                style={styles.button}
            >
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 15,
    },
    image: {
        width: 42,
        height: 42,
        borderRadius: 1,
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    textToday: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 15,
        right: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },
    plus: {
        fontSize: 40,
        color: '#fff',
        position: 'absolute',
        top: -8,
        left: 10, //11
    }
})

export default Home