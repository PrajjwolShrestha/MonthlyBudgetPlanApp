//import native components from react and react native
import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native' //for navigation
import { createStackNavigator } from '@react-navigation/stack' 

// firebase config
import {firebaseConfig} from './config/FirebaseConfiguration'
// firebase library
import * as firebase from 'firebase'
// initialise app
if ( !firebase.apps.length ){
  firebase.initializeApp( firebaseConfig )
}

//import all the necessary  components from component folder
import { MainScreen } from './components/MainScreen'
import { BudgetDetails } from './components/BudgetDetails'
import { Authentication } from './components/Authentication'
import { TouchableOpacity } from 'react-native-gesture-handler';
//export default function name as App
export default function App() {
//using hook for authentication
  const [auth,setAuth] = useState(false)
  //using hook for data reference
  const [dataRef,setDataRef] = useState(null)
  // const [listData, setListData] = useState([])
  const [updating,setUpdating] = useState(false) //hook for updating list or data

  //using useEffect function to read data from the database
  useEffect(() => {
    readData()
  })
  
  let listData = [] //setting up empty list of listData at first

  //const function for register that takes intent, email, and password
  const register = (intent, email,password) => {
    //if user wants to register
    if( intent == 'register'){
      //check the user input and authenticate data and finally create data in firebase
      firebase.auth().createUserWithEmailAndPassword( email, password )
      .catch( error => console.log(error) ) //if error catch error
    } //if user intends to login, check data and authenticate user with the firebase 
    else if( intent == 'login' ) {
      firebase.auth().signInWithEmailAndPassword( email, password )
      .catch( error => console.log(error) ) //check if errror, catch the error
    }
  }

  //add data to firebase
  const addData = (item) => {
    if( !dataRef ) {
      return;
    }
    setUpdating(false)
    const dataObj = { 
      budgetAmount: item.budgetAmount,
      description: item.description,
      category: item.category,
      month: item.month
    }
    firebase.database().ref(`${dataRef}/items/${item.id}`).set(dataObj, () => {
      // update state for rendering of list
      setUpdating(true)
    })
  }

  //read data from the firebase
  const readData = () => {
    if(!dataRef) {
      return
    }//take snapshot of the data and fetch the data back based on key value pair
    firebase.database().ref(`${dataRef}/items`).once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      if(data) {
        let keys = Object.keys(data)
        listData = []
        keys.forEach((key) => {
          let item = data[key]
          item.id = key
          listData.push(item)
        })
        setUpdating(true) //update the data
      }
    })
    
    
  }

  //update data 
  const updateData = (item) => {
    setUpdating(false)
    const data = {budgetAmount: item.budgetAmount,description: item.description, category: item.category, month: item.month }
    firebase.database().ref(`${dataRef}/items/${item.id}`).update( data )
    .then(() => {
      // data is updated
      setUpdating(true)
    })
  }

  //function to delete the data from the firebase
  const deleteData = (id) => {
    setUpdating(false)
    firebase.database().ref(`${dataRef}/items/${id}`).remove()
    .then( () => {
      setUpdating(true)
    })
  }

  // listen for data changes
  const db = firebase.database().ref(`${dataRef}/items`)
  db.on('value', (snapshot) => {
    const dataObj = snapshot.val()
    if(dataObj) {
      let keys = Object.keys(dataObj)
      listData = []
      keys.forEach( (key) => {
        let item = dataObj[key]
        item.id = key
        listData.push(item)
      })
    }
  })

  //firebase auth
  firebase.auth().onAuthStateChanged( (user) => {
    if( user ) {
      setAuth(true)
      setDataRef(`users/${user.uid}`)
    }
    else {
      setAuth(false)
      setDataRef(null)
    }
  } )

  //returns the stack navigator home screen or main screen if everything goes alright
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register">
          { (props) => <Authentication {...props} signup={ register } loggedIn={auth} /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Home"
          options={({navigation,route}) => ({
            headerTitle: "Monthly Budget Planning",
            headerRight: () => (
              <TouchableOpacity style={styles.signout} onPress={ () => {
                firebase.auth().signOut().then( () => {
                  setAuth(false)
                  navigation.reset({ index: 0, routes: [{name: "Register"}] })
                })
              }}>
                <Text style={styles.signOutText}>Sign out</Text>
              </TouchableOpacity>
            )
          })}
        >
          { (props) => <MainScreen {...props} 
          text="Welcome to Home Screen" 
          data={listData}
          add={addData}
          extra={updating}
           /> }
        </Stack.Screen>
        <Stack.Screen name="Detail">
          { (props) => <BudgetDetails {...props} update={updateData} delete={deleteData} /> }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator()

//stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signout: {
    backgroundColor: '#FCAB64',
    padding: 5,
    marginRight: 10,
    borderRadius: 20,
    borderWidth:1,
  },
  signOutText: {
    color: 'black'
  },
});
