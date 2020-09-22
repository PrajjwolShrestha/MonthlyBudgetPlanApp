import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useNavigation as navigateScreen } from '@react-navigation/native'
import { DateFormat } from './DateComponent'

export const BudgetDetails = ( props ) => {
  const [budgetAmount,setBudgetAmount] = useState(props.route.params.amount)
  const [edit,setEdit] = useState(false)
  const [description,setDescription] = useState(props.route.params.note)

  const screenNavigation = navigateScreen()

  return (
    <View>
      <Text style={[styles.budgetAmount, { display: edit ? 'none' : 'flex'} ]}>
        $ {budgetAmount}
      </Text>
      <TextInput 
        style={[styles.budgetAmount, {display: edit ? 'flex' : 'none'}]} 
        placeholder={budgetAmount} 
        onChangeText={ (budgetAmount) => { setBudgetAmount(budgetAmount) }}
        keyboardType="decimal-pad"
      />
      <Button 
        title={ edit? "save" : "edit" } 
        onPress={ () => { 
          if( edit ) {
            setEdit(false)
            let item = {
              budgetAmount: budgetAmount,
              description: props.route.params.note,
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
      <DateFormat date={props.route.params.id} styling={styles.date} />
      <Text style={styles.date}>{props.route.params.category}</Text>
      <Text style={styles.date}>{props.route.params.month}</Text>
      <Text style={styles.date}>{description}</Text>
      <TextInput style={styles.data} />
      <Button title="Edit" />
      <Button 
        title="Delete" 
        onPress={ () => { 
          props.delete(props.route.params.id) 
          screenNavigation.goBack()
        }}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  budgetAmount: {
    textAlign: 'center',
    fontSize: 32,
    marginVertical: 15,
  },
  date: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '700',
  },
})