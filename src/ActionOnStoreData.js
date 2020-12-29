import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

const getList = async (key) => {
    const item = await AsyncStorage.getItem(key)
    if (!item)
        return ([])
    const item_bis = JSON.parse(item)
    return (item_bis)
}

const storeList = async (key, text) => {
    await AsyncStorage.setItem(key, text)
}

const removeList = async (key) => {
    AsyncStorage.removeItem(key)
}

export { getList, storeList, removeList }