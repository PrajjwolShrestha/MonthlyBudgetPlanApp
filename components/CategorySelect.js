import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'

export const CategorySelect = (props) => {
  const [categorySelected,setCategorySelected] = useState('please select category for your budget planning:')

  const [visible, setVisible] = useState(false)

  const CategoryItems = props.items.map((item,index) => {
    return (
      <TouchableOpacity 
        style={selectStyles.selectCategory} 
        key={index} 
        onPress={()=> { 
          setCategorySelected(item.value)
          props.onSelect(item.value)
          setVisible(false) 
        }} 
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    )
  })

  

  return (
    <View style={selectStyles.categoryView}>
      <TouchableOpacity onPress={() => setVisible(true) } >
        <Text>{categorySelected}</Text>
        <Image 
          style={selectStyles.categorySelectImg} 
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
            {CategoryItems}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const selectStyles = StyleSheet.create({
  categoryView: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'#FCEFEF',
  },
  categorySelectImg: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 3,
    top: 3,
  },
  selectCategory: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomColor: '#FCAB64',
    borderBottomWidth: 1,
    
  },
  modalView: {
    marginTop: 100,
    backgroundColor:'#FCEFEF',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'black',
     

  },
})