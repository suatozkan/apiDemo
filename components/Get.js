import { View,Text,FlatList,TouchableOpacity,Image,Dimensions } from 'react-native';
import React, {Component} from 'react';
import { useEffect, useState } from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// the component for getting detail about episodes as name, air_date etc..
export default function Get(props) {
  const { navigation } = props
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchURL = props.item

  useEffect(() => {

    fetch(`${fetchURL}`)
    .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setData(data);

        })
        .catch((e) => {
          setLoading(false);
          setError('fetch failed');
        });
  }, [])

  if (loading) {
    return(
        <View >
        <Text>Loading..</Text>
        </View>
    )
   }

   if (error !== '') {
     return(
       <View >
         <Text>ERROR: {error}</Text>
       </View>
     )
   }

   return (
     <View style={{backgroundColor:'whitesmoke',width:width-20}} >
     <Text>{data.name+', '+data.air_date}</Text>
     </View>
   );

}
