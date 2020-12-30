import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomePage = (props) => {

    const {navigation} = props
    const [fontColor, setFontcolor] = useState('black')
    const [backColor, setBackcolor] = useState('whitesmoke')

    const handleChangeTheme = (theme) => {
        if (theme == 'light') {
            setBackcolor('whitesmoke')
            setFontcolor('black')
            navigation.setOptions({
                headerStyle: { backgroundColor: 'white' },
                headerTitleStyle: { color: 'black' }
            })
            console.log(fontColor)
        } else {
            setBackcolor('#111111')
            setFontcolor('whitesmoke')
            navigation.setOptions({
                headerStyle: { backgroundColor: 'black' },
                headerTitleStyle: { color: 'whitesmoke' }
            })
            console.log(fontColor)
        }
    }

    const getTheme = async () => {
        const item = await AsyncStorage.getItem('@theme_key')
        handleChangeTheme(item)
    }

    useEffect(() => {
        getTheme()
    })

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: backColor }}>
            <TouchableOpacity
                style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    marginTop: '60%',
                    backgroundColor: backColor,
                    padding: '5%',
                    elevation: 15,
                    borderRadius: 5,
                    borderColor: fontColor,
                    borderWidth: 1
                }}
                onPress={() => navigation.navigate('My ToDoList')}
            >
                <Text style={{ color: fontColor }}>Accéder à My ToDoList</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomePage