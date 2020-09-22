//import native components from react and react native
import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'

//export monthselect function and pass prop to select months
export const MonthSelect = (props) => {
  //using hooks to select month
  const [monthselected,setMonthSelected] = useState('select month')
  //using hook to set visibility
  const [visible, setVisible] = useState(false)
  //get index of month that user selects and pass the value
  const MonthItems = props.items.map((item,index) => {
    return (
      <TouchableOpacity 
        style={selectStyles.selectItem} 
        key={index} 
        onPress={()=> { 
          setMonthSelected(item.value)
          props.onSelect(item.value)
          setVisible(false) 
        }} 
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    )
  })

  //returns scroll view where use can select month
  return (
    <View style={selectStyles.selectView}>
      <TouchableOpacity onPress={() => setVisible(true) } >
        <Text style={selectStyles.selectText}>Month: {monthselected}</Text>
        <Image 
          style={selectStyles.selectImage} 
          source={require('../assets/chevron-circle-down-solid.png') } 
        />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        visible = {visible}
        transparent={true}
      >
        <View style={selectStyles.modalView}>
          <ScrollView>
            {MonthItems}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}
//stylesheets
const selectStyles = StyleSheet.create({
  selectView: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'#FCEFEF',
    
  },
  selectText:{
    color:'black',
  },
  selectImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 3,
    top: 3,
  },
  selectItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#FCAB64',
    borderBottomWidth: 1,
  },
  modalView: {
    marginTop: 100,
    backgroundColor:'#FCEFEF',
  },
})