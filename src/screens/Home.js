import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import TodoList from "../components/TodoList";
import todosData from "../data/todos.js";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideCompletedReducer, setTodosReducer } from "../redux/dotosSlice";
import * as Notifications from 'expo-notifications'
import * as Device from "expo-device";
import moment from "moment";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })
})

const Home = () => {

    /*    const [localData, SetLocalData] = useState(
            todosData.sort((a, b) => { return a.isCompleted - b.isCompleted })
        )
     */
    const [isHidden, setIsHidden] = useState(false)
    const [expoPushToken, setExpoPushToken] = useState('')
    const Navigation = useNavigation()
    const dispatch = useDispatch()

    const todos = useSelector(state => state.todos.todos)

    const HandleHidePress = async () => {
        if (isHidden) {
            setIsHidden(false)
            const todos = await AsyncStorage.getItem('@Todos')
            if (todos !== null) {
                dispatch(setTodosReducer(JSON.parse(todos)))
            }
            return
        }
        dispatch(hideCompletedReducer())
        setIsHidden(true)
        /*         if (isHidden) {
                    setIsHidden(false)
                    SetLocalData(todosData.sort((a, b) => { return a.isCompleted - b.isCompleted }))
                } else {
                    setIsHidden(!isHidden)
                    SetLocalData(localData.filter(todo => !todo.isCompleted))
                } */
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => { setExpoPushToken(token) })
        const getTodos = async () => {
            try {
                const todos = await AsyncStorage.getItem('@Todos')
                if (todos !== null) {
                    dispatch(setTodosReducer(JSON.parse(todos)))
                }
            } catch (e) {
                console.log(e);
            }
        }
        getTodos()
    }, [])

    const registerForPushNotificationsAsync = async () => {
        let token
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notifications')
                return
            }
            token = (await Notifications.getExpoPushTokenAsync()).data
            console.log(token)
        } else {
            alert('Must use physical device for push notifications')
            return
        }
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            })
        }
        return token
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
            <TodoList todosData={todos.filter(todo => todo.isToday)} />
            <Text style={styles.title}>Tomorrow</Text>
            {/* TAREAS PARA MAÑANA */}
            <TodoList todosData={todos.filter(todo => !todo.isToday)} />
            <TouchableOpacity
                onPress={() => { Navigation.navigate('Add') }}
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