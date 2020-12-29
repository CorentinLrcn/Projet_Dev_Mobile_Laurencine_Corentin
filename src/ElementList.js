import React from 'react'
import { Alert, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ElementList = ({item}) => {
    const element = {...item}

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{ widht: '90%', height: '10%' }}
                onPress={() => Alert.alert('Vous avez cliqué sur la tache')}
            >
                <Text>{element.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ElementList