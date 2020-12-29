import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomePage = (props) => {

    const {navigation} = props

    const removeData = () => {
        AsyncStorage.removeItem('@todolist_key')
    }

    useEffect(() => {
        removeData()
        console.log('élément supprimé !')
    })

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'whitesmoke' }}>
            <TouchableOpacity
                style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    marginTop: '60%',
                    backgroundColor: 'whitesmoke',
                    padding: '5%',
                    elevation: 15,
                    borderRadius: 5,
                    borderColor: 'black',
                    borderWidth: 1
                }}
                onPress={() => navigation.navigate('My ToDoList')}
            >
                <Text style={{ color: 'black' }}>Accéder à My ToDoList</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomePage