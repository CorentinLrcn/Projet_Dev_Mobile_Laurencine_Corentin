import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getList } from './ActionOnStoreData'
import ElementList from './ElementList'

const ToDoPage = (props) => {
    const [List, setList] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)

    /*const getList = async () => {
        const item = await AsyncStorage.getItem('@todolist_key')
        if (!item) {
            console.log("toDoList = []")
            return []
        }
        const item_bis = JSON.parse(item)
        console.log("toDoList = '" + item_bis + "'")
        return item_bis
    }*/

    /*useEffect(() => {
        //setInterval(() => {
        setList(getList())
        //}, 3000)
    }, [])*/

    useEffect(() => {
        const fetchList = async () => {
            setList(getList('@todolist_key'))
            if (List == null || List == '') {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
        }
        fetchList()
    }, [])

    /*list = (toDoList.map((item) => {
        return <ElementList item={item} />
    }))*/

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            { isEmpty ? (
                <Text>Votre liste est vide, cliquez sur le "+" pour en ajouter une</Text>
            ) : (
                <Text>Votre liste n'est pas vide, cliquez sur le "+" pour en ajouter une autre</Text>
            )}
        </View>
    )
}

export default ToDoPage