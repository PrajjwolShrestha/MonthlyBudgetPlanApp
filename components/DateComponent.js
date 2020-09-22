import React, {useState,useEffect} from 'react'
import { StyleSheet, Text } from 'react-native'

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

export const DateFormat = (props) => {
  const [date,setDate] = useState('')

  useEffect( () => {
    const dateObj = new Date( parseInt(props.date) )
    const dateN = dateObj.getDate()
    const dayName = days[dateObj.getDay()]
    const monthName = months[dateObj.getMonth() ]
    const year = dateObj.getFullYear()
    setDate(`${dayName}, ${dateN} ${monthName} ${year}`)
  })

  return (
    <Text style={{...props.styling}}>{date}</Text>
  )
}