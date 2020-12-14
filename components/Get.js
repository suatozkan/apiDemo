import { View,Text,FlatList,TouchableOpacity,Image,Dimensions } from 'react-native';
import React, {Component} from 'react';
import { useEffect, useState } from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function Get(props) {
  const { navigation } = props

  const [data, setData] = useState(null)
  const fetchURL = props.item
  const getData = () =>
    fetch(`${fetchURL}`).then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data.results))
  }, [])
  console.log(data,'wwwwww',props.item)

  return (
    <View >


    <Text>ss</Text>

    </View>
  );
}
