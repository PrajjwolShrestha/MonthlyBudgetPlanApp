import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'

export const MonthSelect = (props) => {
  const [monthselected,setMonthSelected] = useState('select month')

  const [visible, setVisible] = useState(false)

  

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

  return (
    <View style={selectStyles.selectView}>
      <TouchableOpacity onPress={() => setVisible(true) } >
        <Text>{monthselected}</Text>
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

const selectStyles = StyleSheet.create({
  selectView: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'#FCEFEF',
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