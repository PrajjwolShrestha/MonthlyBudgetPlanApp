import React, { useState } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const AuthScreen = ( props ) => {
  const [login,setLogin] = useState(false)
  // hooks for validation
  const [validEmail,setValidEmail] = useState(false)
  const [validPassword,setValidPassword] = useState(false)

  const navigation = useNavigation()

  //email and password validation
  const validateEmail = (email) => {
      //check if email is valid
    if( email.indexOf('@') > 0 && email.indexOf('.') > 0 ) {
      setValidEmail( true )
    }
    else {
      setValidEmail( false )
    }
  }

  const validatePassword = (password) => {
    if( password.length >= 8 ) {
      setValidPassword( true )
    }
    else {
      setValidPassword( false )
    }
  }
  //email and password validation end

  if (!login) {
    return (
      // register view
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput 
          style={styles.input} 
          placeholder="you@email.com"
          onChangeText={ (email) => validateEmail(email) } 
        /> 
        <TextInput 
          style={styles.input}
          placeholder="min 8 characters" 
          secureTextEntry={true}
          onChangeText={ (password) => validatePassword(password) }
        />
        <TouchableOpacity 
          style={ !validEmail || !validPassword ? styles.buttonDisabled : styles.button }
          disabled={ !validEmail || !validPassword ? true : false }
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.altText}>Already have an account?</Text>
        <TouchableOpacity 
          style={styles.altButton}
          onPress={ () => { 
            setLogin(true) 
            navigation.setOptions({title: 'Sign in'})
          } }
        >
          <Text style={styles.altButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      // login view
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput style={styles.input} placeholder="your email here..." /> 
        <TextInput 
          style={styles.input}
          placeholder="your password here..." 
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.altText}>Don't have an account?</Text>
        <TouchableOpacity 
          style={styles.altButton}
          onPress={ () => { 
            setLogin(false) 
            navigation.setOptions({title: 'Register'})
          } }
        >
          <Text style={styles.altButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#777777',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#444444',
  },
  buttonText: {
    color: '#eeeeee',
    textAlign: 'center',
  },
  buttonDisabled: {
    padding: 10,
    backgroundColor: '#888888',
  },
  altText : {
    textAlign: 'center',
    marginTop: 20,
  },
  altButton: {
    marginTop: 10,
    padding: 10,
  },
  altButtonText: {
    color: 'blue',
    textAlign: 'center',
  }
})