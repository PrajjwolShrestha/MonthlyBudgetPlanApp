import React, { useState, useEffect } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation as navigateScreen } from '@react-navigation/native'

export const Authentication = ( props ) => {
  const [userLogin,setUserLogin] = useState(false)
  // hooks for validation
  const [validUserEmail,setValidUserEmail] = useState(false)
  const [validUserPassword,setValidUserPassword] = useState(false)
  // hooks for user credentials
  const [userEmail,setUserEmail] = useState(null)
  const [userPassword, setUserPassword ] = useState(null)

  const screenNavigation = navigateScreen()

  useEffect(() => {
    if( props.loggedIn ) {
      screenNavigation.reset({
        index: 0,
        routes: [{ name: "Home"}]
      })
    }
  })

  const checkUserEmailValid = (userEmail) => {
    if( userEmail.indexOf('@') > 0 && userEmail.indexOf('.') > 0 ) {
      setValidUserEmail( true )
      setUserEmail( userEmail )
    }
    else {
      setValidUserEmail( false )
    }
  }

  const checkUserPasswordValid = (userPassword) => {
    if( userPassword.length >= 8 ) {
      setValidUserPassword( true )
      setUserPassword(userPassword)
    }
    else {
      setValidUserPassword( false )
    }
  }

  if (!userLogin) {
    return (
      // register view
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Register</Text>
        <TextInput 
          style={styles.inputField} 
          placeholder="email: you@email.com"
          placeholderTextColor = "grey"
          onChangeText={ (userEmail) => checkUserEmailValid(userEmail) } 
        /> 
        <TextInput 
          style={styles.inputField}
          placeholder="password: min 8 characters" 
          placeholderTextColor = "grey"
          secureTextEntry={true}
          onChangeText={ (userPassword) => checkUserPasswordValid(userPassword) }
        />
        <TouchableOpacity 
          style={ !validUserEmail || !validUserPassword ? styles.btnDisabled : styles.btn }
          disabled={ !validUserEmail || !validUserPassword ? true : false }
          onPress={ () => { props.signup('register',userEmail,userPassword) } }
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.textChanged}>Already have an account?</Text>
        <TouchableOpacity 
          style={styles.altBtn}
          onPress={ () => { 
            setUserLogin(true) 
            screenNavigation.setOptions({title: 'Sign in'})
          } }
        >
          <Text style={styles.altBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      // login view
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Sign In</Text>
        <TextInput 
          style={styles.inputField} placeholder="Please enter your email here."
          placeholderTextColor = "grey"
          onChangeText = { (userEmail) => { setUserEmail(userEmail) }} 
        /> 
        <TextInput 
          style={styles.inputField}
          placeholder="Please enter your password here." 
          placeholderTextColor = "grey"
          secureTextEntry={true}
          onChangeText={ (userPassword) => { setUserPassword(userPassword) } }
        />
        <TouchableOpacity 
          style={styles.btn}
          onPress={ () => { props.signup('login', userEmail, userPassword ) } }
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.textChanged}>Don't have an account?</Text>
        <TouchableOpacity 
          style={styles.altBtn}
          onPress={ () => { 
            setUserLogin(false) 
            screenNavigation.setOptions({title: 'Register'})
          } }
        >
          <Text style={styles.altBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor:'#7FD8BE',
  },
  mainTitle: {
    fontSize: 32,
    textAlign: 'center',
    color:'#0B0500',
  },
  inputField: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#0B0500',
    marginVertical: 20,
    backgroundColor:'#FCEFEF',
    borderRadius:20,
  },
  btn: {
    padding: 10,
    backgroundColor: '#FCAB64',
    borderRadius:20,
    borderWidth:1,
    borderColor:'#0B0500',
  },
  btnText: {
    color: 'black',
    textAlign: 'center',
    fontSize:16,
  },
  btnDisabled: {
    padding: 10,
    backgroundColor: '#FCD29F',
    borderRadius:20,
    borderWidth:1,
    borderColor:'#0B0500',
  },
  textChanged : {
    textAlign: 'center',
    marginTop: 20,
    fontSize:16,
  },
  altBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FCAB64',
    borderRadius:20,
    fontSize:16,
    borderWidth:1,
    borderColor:'#0B0500',


  },
  altBtnText: {
    color: 'black',
    textAlign: 'center',
  }
}) 