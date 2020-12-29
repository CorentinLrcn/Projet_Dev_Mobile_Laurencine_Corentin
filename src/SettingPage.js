import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SettingPage = (props) => {
    const {navigation} = props
    const {getItem, setItem} = useAsyncStorage('@theme_key')
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
        const item = await getItem()
        handleChangeTheme(item)
    }

    const saveTheme = async (item) => {
        await setItem(item)
        handleChangeTheme(item)
    }

    useEffect(() => {
        getTheme()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: backColor }}>
            <Text style={{ marginTop: '50%', color: fontColor }}>Vous préférez un thème :</Text>
            <View style={{ flex:1, flexDirection: 'row', alignItems: 'center', marginTop: '-50%' }}>
                <TouchableOpacity
                    style={{
                        fontSize: 15,
                        alignSelf: 'center',
                        backgroundColor: 'whitesmoke',
                        paddingVertical: '10%',
                        paddingHorizontal: '15%',
                        elevation: 10,
                        borderRadius: 5,
                        borderColor: 'Black',
                        borderWidth: 1
                    }}
                    onPress={() => {
                        saveTheme('light')
                    }}
                >
                    <Text>Clair</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        fontSize: 15,
                        alignSelf: 'center',
                        backgroundColor: 'black',
                        paddingVertical: '9.5%',
                        paddingHorizontal: '15%',
                        elevation: 10,
                        borderRadius: 5,
                        borderColor: 'whitesmoke',
                        borderWidth: 1
                    }}
                    onPress={() => {
                        saveTheme('dark')
                    }}
                >
                    <Text style={{ color: 'whitesmoke' }}>Sombre</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SettingPage