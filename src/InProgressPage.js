import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const InProgressPage = (props) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
            style={{fontSize: 15, alignSelf: 'center'}}
            onPress={() => props.navigation.goBack()}
        >
            <Text>Retour</Text>
        </TouchableOpacity>
        </View>
    )
}

export default InProgressPage