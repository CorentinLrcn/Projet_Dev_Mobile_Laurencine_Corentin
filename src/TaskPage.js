import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const TaskPage = (props) => {
    const [taskName, setTaskName] = useState('')
    const [selectedValue, setSelectedValue] = useState('ToDo')
    /*const [todoList, setTodoList] = useState([])
    const [ipList, setIPList] = useState([])
    const [doneList, setDoneList] = useState([])*/
    const [fontColor, setFontcolor] = useState('black')
    const [backColor, setBackcolor] = useState('whitesmoke')

    const {navigation} = props

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

    const getList = async (key) => {
        const item = await AsyncStorage.getItem(key)
        if (!item) {
            console.log('liste vide')
            return []
        }
        const item_bis = JSON.parse(item)
        console.log('liste = ' + item_bis)
        return item_bis
    }

    const addTask = async () => {
        console.log('selectedValue = ' + selectedValue)
        var tmp_list = []
        var tmp_list_bis = []
        if (selectedValue == 'ToDo') {
            //tmp_list = [...todoList]
            tmp_list = getList('@todolist_key')
            //tmp_list_bis = tmp_list.concat(taskName)
            tmp_list_bis = [...tmp_list, taskName]
            console.log('tmp_list = ' + tmp_list)
            //tmp_list.push(taskName)
            console.log('taskName = ' + taskName)
            console.log('tmp_list_bis = ' + tmp_list_bis)
            //setTodoList(tmp_list_bis)
            //console.log('todoList = ' + todoList)
            setTaskName('')
            AsyncStorage.setItem('@todolist_key', JSON.stringify(tmp_list))
        } else if (selectedValue == 'InProgress') {
            tmp_list = [...ipList]
            tmp_list_bis = tmp_list.concat(taskName)
            console.log('ipList = ' + ipList)
            console.log('taskName = ' + taskName)
            console.log('tmp_list = ' + tmp_list_bis)
            setIPList(tmp_list_bis)
            console.log('ipList = ' + ipList)
            setTaskName('')
            AsyncStorage.setItem('@iplist_key', JSON.stringify(ipList))
        } else {
            tmp_list = [...doneList]
            tmp_list_bis = tmp_list.concat(taskName)
            console.log('doneList = ' + doneList)
            console.log('taskName = ' + taskName)
            console.log('tmp_list = ' + tmp_list_bis)
            setDoneList(tmp_list_bis)
            console.log('doneList = ' + doneList)
            setTaskName('')
            AsyncStorage.setItem('@donelist_key', JSON.stringify(doneList))
        }
    }

    const handleChangeOnTask = async ({section, typeChange}) => {
        //let tmp_list = []
        //let tmp_list2 = []
        //let index = 1
        if (typeChange == 'add') {
            if (section == 'todo') {
                const tmp_list = [...todoList]
                const tmp_list_bis = tmp_list.concat(taskName)
                console.log('todoList = ' + todoList)
                console.log('taskName = ' + taskName)
                console.log('tmp_list = ' + tmp_list_bis)
                //tmp_list[tmp_list.length] = text
                setTodoList(tmp_list_bis)
                setTaskName('')
                //AsyncStorage.setItem('@todolist_key', JSON.stringify(todoList))
                try {
                    await AsyncStorage.setItem(
                        '@todolist_key',
                        JSON.stringify({...todoList})
                    )
                  } catch (error) {
                    console.log('erreur : ' + error)
                  }
            }/* else if (section == 'inprogress') {
                tmp_list = ipList
                tmp_list[tmp_list.length] = text
                setIPList(tmp_list)
            } else {
                tmp_list = doneList
                tmp_list[tmp_list.length] = text
                setDoneList(tmp_list)
            }*/
        }/* else if (typeChange == 'delete') {
            if (section == 'todo') {
                tmp_list = todoList
                tmp_list.splice(index, 1)
                setTodoList(tmp_list)
            } else if (section == 'inprogress') {
                tmp_list = ipList
                tmp_list.splice(index, 1)
                setIPList(tmp_list)
            } else {
                tmp_list = doneList
                tmp_list.splice(index, 1)
                setDoneList(tmp_list)
            }
        } else {
            if (section == 'todo') {
                tmp_list = todoList
                tmp_list[tmp_list.length] = text
                setTodoList(tmp_list)
            } else if (section == 'inprogress') {
                tmp_list = ipList
                tmp_list[tmp_list.length] = text
                setIPList(tmp_list)
            } else {
                tmp_list = doneList
                tmp_list[tmp_list.length] = text
                setDoneList(tmp_list)
            }
        }*/
    }

    useEffect(() => {
        getTheme()
    })

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: backColor }}>
            <Text style={[ styles.lineSeparator, { borderColor: fontColor } ]}/>
            <Text style={{ marginTop: '10%', fontSize: 15, color: fontColor }}>Nom de la tâche :</Text>
            <TextInput
                style={[ styles.taskNameInput, { borderColor: fontColor, backgroundColor: backColor, color: fontColor, textDecorationColor: fontColor } ]}
                onChangeText={text => setTaskName(text)}
                value={taskName}
            />
            <Text style={[ styles.lineSeparator, { borderColor: fontColor } ]}/>
            <Text style={{ marginTop: '10%', fontSize: 15, color: fontColor }}>Choix de la liste :</Text>
            <View style={[ styles.listPickerContainer, {borderColor: fontColor, backgroundColor: backColor} ]}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ width: 250, fontSize: 15, height: 25, color: fontColor }}
                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="To Do" value="ToDo" />
                    <Picker.Item label="In Progress" value="InProgress" />
                    <Picker.Item label="Done" value="Done" />
                </Picker>
            </View>
            <Text style={[ styles.lineSeparator, { borderColor: fontColor } ]}/>
            { props.route.params.isNew ? (
                <>
                    <TouchableOpacity
                    style={{ marginTop: '20%', backgroundColor: 'forestgreen', borderWidth: 1, borderRadius: 5, elevation: 5, paddingHorizontal: '20%', paddingVertical: '2.5%'}}
                    onPress={() => {
                        addTask()
                        props.navigation.navigate(selectedValue)
                    }}
                    >
                    <Text style={{ fontSize: 15, color: 'whitesmoke'}}>Créer</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity
                        style={{ marginTop: '10%', backgroundColor: 'red', borderWidth: 1, borderRadius: 5, elevation: 5, paddingHorizontal: '20%', paddingVertical: '2.5%'}}
                        onPress={() => Alert.alert('Souhaitez-vous modifier ?')}
                    >
                        <Text style={{ fontSize: 15, color: 'whitesmoke'}}>Modifier</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: '10%', backgroundColor: 'red', borderWidth: 1, borderRadius: 5, elevation: 5, paddingHorizontal: '20%', paddingVertical: '2.5%'}}
                        onPress={() => Alert.alert('Souhaitez-vous supprimer ?')}
                    >
                        <Text style={{ fontSize: 15, color: 'whitesmoke'}}>Supprimer</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listPickerContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 5,
        height: 30,
        marginTop: '5%'
    },
    taskNameInput: {
        width: 250,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 15,
        elevation: 5,
        height: 30,
        marginTop: '5%',
        textAlign: 'center'
    },
    lineSeparator: {
        marginTop: '10%',
        borderWidth: 1,
        width: '70%',
        height: 0
    }
})

export default TaskPage