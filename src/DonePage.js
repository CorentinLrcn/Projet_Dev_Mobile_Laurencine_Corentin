import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ElementList from './ElementList'

const DonePage = (props) => {
    const [List, setList] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)

    const getList = async () => {
        const item = await AsyncStorage.getItem('@donelist_key')
        if (!item) {
            console.log("doneList = []")
            return []
        }
        const item_bis = JSON.parse(item)
        console.log("doneList = '" + item_bis + "'")
        return item_bis
    }

    useEffect(() => {
        //setInterval(() => {
        setList(getList())
        //}, 3000)
    }, [])

    /*useEffect(() => {
        const fetchList = async () => {
          let item = null
          try {
            item = await AsyncStorage.getItem('@todolist_key')
            item = JSON.parse(item)
          } catch (err) {
            console.log(err)
          }
          console.log('toDoList = ' + { item })
          setList(item)
          if (List == null || List == '') {
            setIsEmpty(true)
          } else {
            setIsEmpty(false)
          }
        }
        fetchList()
        // console.log(props)
        /*setInterval(() => {
            fetchList()
        }, 3000)
    }, [])*/

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

export default DonePage