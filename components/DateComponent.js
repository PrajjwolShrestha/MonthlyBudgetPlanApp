//import native components from react and react native
import React, {useState,useEffect} from 'react'
import { StyleSheet, Text } from 'react-native'

//declaring constant variables for days and months
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

//export dateformat function and pass the prop for getting days and date in time format
export const DateFormat = (props) => {
  const [date,setDate] = useState('')

  //using useEffect property to get date format
  useEffect( () => {
    const dateObj = new Date( parseInt(props.date) )
    const dateN = dateObj.getDate()
    const dayName = days[dateObj.getDay()]
    const monthName = months[dateObj.getMonth() ]
    const year = dateObj.getFullYear()
    setDate(`${dayName}, ${dateN} ${monthName} ${year}`)
  })

  //returnt the parsed data as props 
  return (
    <Text style={{...props.styling}}>{date}</Text>
  )
}