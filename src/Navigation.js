import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
//import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from './HomePage'
import ToDoPage from './ToDoPage'
import InProgressPage from './InProgressPage'
import DonePage from './DonePage'
//import { backButton, settingButton, addButton } from './MenuButton'
import MenuButton from './MenuButton'
import SettingPage from './SettingPage'
import TaskPage from './TaskPage'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'

const Stack = createStackNavigator()
//const Drawer = createDrawerNavigator()
const Tabs = createBottomTabNavigator()

const TabNavigation = () => {
    const [colorBack, setColorBack] = useState('white')
    const [colorIconActivePage, setColorIconActivePage] = useState('black')
    const {getItem} = useAsyncStorage('@theme_key')

    const fetchTheme = async () => {
        const item = await getItem()
        if (item == 'light') {
            setColorBack('white')
            setColorIconActivePage('black')
        } else {
            setColorBack('black')
            setColorIconActivePage('whitesmoke')
        }
    }

    useEffect(() => {
        fetchTheme()
    }, [])

    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colorIconActivePage,
                labelStyle: {
                    fontSize: 15
                },
                style: {
                    backgroundColor: colorBack
                }
            }}
        >
            <Tabs.Screen
                name="ToDo"
                component={ToDoPage}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name="close" size={20} color='red' />
                    )
                }}
            />
            <Tabs.Screen
                name="InProgress"
                component={InProgressPage}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name="clockcircleo" size={20} color='orange' />
                    )
                }}
            />
            <Tabs.Screen
                name="Done"
                component={DonePage}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name="check" size={20} color='green' />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}

const Navigation = () => {
    const [colorBack, setColorBack] = useState('white')
    const [fontColor, setFontColor] = useState('black')
    const {getItem} = useAsyncStorage('@theme_key')

    const fetchTheme = async () => {
        const item = await getItem()
        if (item == 'light') {
            setColorBack('white')
            setFontColor('black')
        } else {
            setColorBack('black')
            setFontColor('white')
        }
    }

    useEffect(() => {
        fetchTheme()
    }, [])

    return (
        <Stack.Navigator initalRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomePage}
                options={({ navigation }) => ({
                    headerStyle: { backgroundColor: colorBack },
                    headerRight: () => MenuButton(navigation, 'setting'),
                    headerTitleAlign: 'center',
                    headerTitleStyle: { color: fontColor }
                })}
            />
            <Stack.Screen
                name="My ToDoList"
                component={TabNavigation}
                options={({ navigation }) => ({
                    headerRight: () => MenuButton(navigation, 'add'),
                    headerLeft: null,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { color: fontColor },
                    headerStyle: {  backgroundColor: colorBack }
                })}
            />
            <Stack.Screen 
                name="Parametres"
                component={SettingPage}
                options={({ navigation }) => ({
                    headerLeft: () => MenuButton(navigation, 'back'),
                    headerTitleAlign: 'center',
                    headerStyle: {  backgroundColor: colorBack }
                })}
            />
            <Stack.Screen 
                name="Tasks"
                component={TaskPage}
            />
        </Stack.Navigator>
    )
}

export default Navigation