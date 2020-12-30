import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const MenuButton = (navigation, type) => {
  const [color, setColor] = useState('black')
  const {getItem} = useAsyncStorage('@theme_key')
  const isNew = true

  const fetchTheme = async () => {
    const item = await getItem()
    if (item == 'light') {
      setColor('black')
    } else {
      setColor('whitesmoke')
    }
  }

  useEffect(() => {
    fetchTheme()
  })
  
  const HandleChangeButton = () => {
    if (type == 'back') {
      return (
        backButton(color)
      )
    } else if (type == 'setting') {
      return (
        settingButton(color)
      )
    } else {
      return (
        addButton(color)
      )
    }
  }

  const backButton = (color) => {
    return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 15 }}>
      <AntDesign name="arrowleft" size={25} color={color} />
    </TouchableOpacity>
    )
  }

  const settingButton = (color) => {
    return (
    <TouchableOpacity onPress={() => navigation.navigate('Parametres')} style={{ paddingRight: 15 }}>
      <AntDesign name="setting" size={25} color={color} />
    </TouchableOpacity>
    )
  }

  const addButton = (color) => {
    return (
    <TouchableOpacity onPress={() => navigation.navigate('Tasks', {isNew})} style={{ paddingRight: 15 }}>
      <AntDesign name="plus" size={25} color={color} />
    </TouchableOpacity>
    )
  }

  return (
    <HandleChangeButton />
  )

}

//export { backButton, settingButton, addButton }
export default MenuButton