import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { getList } from './ActionOnStoreData'
import ElementList from './ElementList'

const DonePage = () => {
    const [List, setList] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    const [fontColor, setFontcolor] = useState('black')
    const [backColor, setBackcolor] = useState('whitesmoke')

    const handleChangeTheme = (theme) => {
        if (theme == 'light') {
            setBackcolor('whitesmoke')
            setFontcolor('black')
            console.log(fontColor)
        } else {
            setBackcolor('#111111')
            setFontcolor('whitesmoke')
            console.log(fontColor)
        }
    }

    const getTheme = async () => {
        const item = await AsyncStorage.getItem('@theme_key')
        handleChangeTheme(item)
    }

    useEffect(() => {
        const fetchList = async () => {
            setList(getList('@donelist_key'))
            if (List == null || List == '') {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
        }
        fetchList()
        getTheme()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: backColor }}>
            { isEmpty ? (
                <Text style={{ color: fontColor }}>Votre liste est vide, cliquez sur le "+" pour en ajouter une</Text>
            ) : (
                /*<Text>Votre liste n'est pas vide, cliquez sur le "+" pour en ajouter une autre</Text>*/
                List.map((item) => {
                    return <ElementList item={item} />
                })
            )}
        </View>
    )
}

export default DonePage