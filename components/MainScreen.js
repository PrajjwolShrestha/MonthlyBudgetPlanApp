import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native'
import { useNavigation as navigateScreen } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import { CategorySelect } from './CategorySelect'
import { MonthSelect} from './MonthSelect'



export const MainScreen = (props) => {
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

  const [category,setCategory] = useState(null)
  const [month,setMonth] = useState(null)
  const [budgetAmount,setBudgetAmount] = useState(0)
  const [description,setDescription] = useState(null)

  const [validBudgetAmount,setValidBudgetAmount] = useState(false)

  const screenNavigation = navigateScreen()

  const validateBudgetAmount = (budgetAmount) => {
    if( parseFloat(budgetAmount) ) {
      setValidBudgetAmount(true)
      setBudgetAmount(budgetAmount)
    }
    else {
      setValidBudgetAmount(false)
    }
  }

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
  
  const showDetail = ( item ) => {
    screenNavigation.navigate("Detail", item )
  }

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