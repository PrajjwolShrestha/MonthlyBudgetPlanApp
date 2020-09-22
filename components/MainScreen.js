//import native components from react and react native
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { useNavigation as navigateScreen } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
//importing functions from component folder
import { CategorySelect } from './CategorySelect'
import { MonthSelect} from './MonthSelect'

//export mainScreen function and passing prop to display categories and months in main page
export const MainScreen = (props) => {
  //declaring constant array of categories
  const selectCategory = [
    {label: "Food", value: "food"},
    {label: "Transport", value: "transport"},
    {label: "Groceries", value: "groceries"},
    {label: "Bills", value: "bills"},
    {label: "Clothing", value: "clothing"},
    {label: "Gifts", value: "gifts"},
    {label: "Rent", value: "rent"},
    {label: "Other", value: "other"},
  ]

  //declaring constant arrays of months
  const selectMonths = [
    {label: "Jan", value: "Jan"},
    {label: "Feb", value: "Feb"},
    {label: "Mar", value: "Mar"},
    {label: "Apr", value: "Apr"},
    {label: "May", value: "May"},
    {label: "Jun", value: "Jun"},
    {label: "Jul", value: "Jul"},
    {label: "Aug", value: "Aug"},
    {label: "Sep", value: "Sep"},
    {label: "Oct", value: "Oct"},
    {label: "Nov", value: "Nov"},
    {label: "Dec", value: "Dec"},
  ]

  //using hooks for category
  const [category,setCategory] = useState(null)
  //using hooks for month
  const [month,setMonth] = useState(null)
  const [budgetAmount,setBudgetAmount] = useState(0) //for budget
  const [description,setDescription] = useState(null) //for the description of budget 

  const [validBudgetAmount,setValidBudgetAmount] = useState(false) //check or validate budget amount

  const screenNavigation = navigateScreen() //navigate between the screens

  //check the budget is valid or not 
  const validateBudgetAmount = (budgetAmount) => {
    if( parseFloat(budgetAmount) ) {
      setValidBudgetAmount(true)
      setBudgetAmount(budgetAmount)
    }
    else {
      setValidBudgetAmount(false)
    }
  }

  //get id of an item using time function and add item to list
  const addItem = () => {
    const itemId = new Date().getTime()
    const itemMonth = month

    const itemAmount = budgetAmount
    const itemCategory = category
    const itemNote = description
    props.add({
      id: itemId,
      month: itemMonth,

      budgetAmount: itemAmount,
      category: itemCategory,
      description: itemNote
    })
  }

  //render the list of an item and pass their value
  const renderList = ({item}) => (
    <ListItem 
    id={item.id} 
    month={item.month}
    budgetAmount={item.budgetAmount} 
    category={item.category} 
    clickHandler = {showDetail}
    item = {item}
    />
  )
  
  //based on id, show the details of that item
  const showDetail = ( item ) => {
    screenNavigation.navigate("Detail", item )
  }

  //return the main screen components  
  return (
    <View style={homeStyle.container}>
      <View>
        <Text style={homeStyle.welcomeText}> Welcome to 'Monthly Budget Planning App' where you can plan your monthly budget for different categories.</Text>

        <View style={homeStyle.monthStyle}>
          <MonthSelect items={selectMonths} onSelect={setMonth} />
        </View>
        <CategorySelect style={homeStyle.monthStyle}  items={selectCategory} onSelect={setCategory} />


        <TextInput 
          style={homeStyle.input} 
          placeholder="monthly budget amount" 
          placeholderTextColor='grey'
          onChangeText={ (budgetAmount) => validateBudgetAmount(budgetAmount) }
          keyboardType='decimal-pad'
        />

        <TextInput 
          style={homeStyle.input} 
          placeholder="description or plans or notes" 
          placeholderTextColor='grey'
          onChangeText={ (description) => setDescription(description)}
        />
        <TouchableOpacity 
          style={ validBudgetAmount && category && month ? homeStyle.button : homeStyle.buttonDisabled }
          disabled={ validBudgetAmount && category && month ? false : true }
          onPress={ () => { addItem() } }
        >
          <Text style={homeStyle.buttonText}>Add</Text>
        </TouchableOpacity>
        <View style={homeStyle.itemheading}>
          <Text style={homeStyle.itemheadingText}>Month</Text>
          <Text style={homeStyle.itemheadingText}>Category</Text>
          <Text style={homeStyle.itemheadingText}>Budget</Text>
        </View>
      </View>
      <FlatList
        data = {props.data}
        renderItem = {renderList} 
        keyExtractor = { item => item.id }
        extraData = {props.extra}
      />
    </View>
  )
}

//prepare the list of an item and make it clickable
//when clicked, prompt to its detail screen
//display item list in flatlist
const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={ () => props.clickHandler(props.item) }>
      <View style={homeStyle.item}>
        <Text>{props.month}</Text>
        <Text>{props.category}</Text>
        <Text>$ {props.budgetAmount}</Text>
      </View>
    </TouchableOpacity>
  )
}

//stylesheet
const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor:'#7FD8BE'
  },
  item: {
    display:'flex',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#FCEFEF',
    marginVertical:10,
  },
  itemheading: {
    display:'flex',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#F9E9EC',
    marginVertical:10,
  },
  itemheadingText:{
    fontWeight:'600',
    fontSize:16,
  },
  input: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#FCEFEF',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FCAB64',
    padding: 10,
    borderRadius: 20,
    borderWidth:1,
  },
  buttonDisabled: {
    backgroundColor: '#FCD29F',
    padding: 10,
    borderRadius: 20,
    borderWidth:1,
    color:'black'
  },
  buttonText: {
    textAlign: 'center',
    color: '#333333',
  },
  monthStyle:{
    paddingBottom:10,
    paddingTop:10,
  },
  welcomeText:{
    textAlign:'center',
    marginVertical:10,
    fontSize:18,
  }
})