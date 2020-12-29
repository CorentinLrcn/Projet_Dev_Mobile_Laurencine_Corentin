import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const ButtonNav = ({label, route, description}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{fontSize: 15, alignSelf: 'center'}}
            onPress={() => {
                if (route == "back")
                    navigation.navigate(navigation.goBack())
                else
                    navigation.navigate(route, {description})
            }}
        >
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonNav