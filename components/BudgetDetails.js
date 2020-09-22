import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useNavigation as navigateScreen } from '@react-navigation/native'
import { DateFormat } from './DateComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const BudgetDetails = ( props ) => {
  const [budgetAmount,setBudgetAmount] = useState(props.route.params.budgetAmount)
  const [editBudget,setEditBudget] = useState(false)
  const [editDescription,setEdit] = useState(false)
  const [description,setDescription] = useState(props.route.params.description)

  const screenNavigation = navigateScreen()

  return (
    <View style={styles.container}>
      

      <Text style={styles.month}>This budget is for the month of: {props.route.params.month}</Text>

      <Text style={styles.category}>Category: {props.route.params.category}</Text>



      <Text style={[styles.budgetAmount, { display: editBudget ? 'none' : 'flex'} ]}> Budget Amount: 
        $ {budgetAmount}
      </Text>

      <TextInput 
        style={[styles.budgetAmount, {display: editBudget ? 'flex' : 'none'}]} 
        placeholder={budgetAmount} 
        onChangeText={ (budgetAmount) => { setBudgetAmount(budgetAmount) }}
        keyboardType="decimal-pad"
      />

      <View style={styles.button}>
        <Button 
          title={ editBudget? "Save Budget" : "Edit Budget" } 
          color="black"
          onPress={ () => { 
            if( editBudget ) {
              setEditBudget(false)
              let item = {
                budgetAmount: budgetAmount,
                description: props.route.params.description,
                category: props.route.params.category,
                month: props.route.params.month,
                id: props.route.params.id
              }
              props.update( item )
            }
            else {
              setEditBudget(true) 
            }
          } } 
        />
      </View>
      




      



      <Text style={[styles.budgetAmount, { display: editDescription ? 'none' : 'flex'} ]}>
         {description}
      </Text>
      <TextInput 
        style={[styles.budgetAmount, {display: editDescription ? 'flex' : 'none'}]} 
        placeholder={description} 
        onChangeText={ (description) => { setDescription(description) }}
      />
      <View style={styles.button}>
        <Button 
          title={ editDescription? "Save Description" : "Edit Description" } 
          color="black"
          onPress={ () => { 
            if( editDescription ) {
              setEdit(false)
              let item = {
                budgetAmount: budgetAmount,
                description: description,
                category: props.route.params.category,
                month: props.route.params.month,
                id: props.route.params.id
              }
              props.update( item )
            }
            else {
              setEdit(true) 
            }
          } } 
        />  
      </View>
      <View  style={styles.deletebutton}>
        <Button 
              
                title="Delete" 
                color="black"
                onPress={ () => { 
                  props.delete(props.route.params.id) 
                  screenNavigation.goBack()
                }}
        />
      </View>
      

      

      <View style={styles.subView}>
        <Text style={styles.subViewText}>Prepared monthly budget on:</Text>
        <DateFormat date={props.route.params.id} styling={styles.date} />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#7FD8BE'
  },
  budgetAmount: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 15,
  },
  date: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '700',
  },
  button:{
    padding: 5,
    backgroundColor: '#FCAB64',
    borderRadius:20,
    borderWidth:1,
    borderColor:'#0B0500',
    marginVertical:10,
    color:'black'
  },
  deletebutton:{
    padding: 5,
    backgroundColor: '#FCAB64',
    borderRadius:20,
    borderWidth:1,
    borderColor:'#0B0500',
    marginVertical:10,
    color:'black',
  },
  subView:{
    backgroundColor:'#A1FCDF',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 50, //Here is the trick
  },
  subViewText:{
    textAlign: 'center',
    marginVertical: 10,
  },
  month:{
    textAlign: 'center',
    fontSize:24,
    marginVertical:20,
    paddingVertical:20,
    backgroundColor:'#A1FCDF',
    fontWeight: '500',
  },
  category:{
    textAlign: 'center',
    fontSize:16,
    marginVertical:10,
  }
})