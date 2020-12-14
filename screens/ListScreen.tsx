import * as React from 'react';
import { StyleSheet,TouchableOpacity, FlatList,Image,Dimensions} from 'react-native';
import { StackActions } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TabOneScreen(props) {
  const { navigation } = props

  const [data, setData] = useState(null)
  const fetchURL = "https://rickandmortyapi.com/api/character"
  const getData = () =>
    fetch(`${fetchURL}`).then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data.results))
  }, [])
  console.log(data)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TouchableOpacity
             onPress={()=> navigation.dispatch(StackActions.push('Two', {user: 'jane'}))
             }>
           <Text style={styles.text}>One</Text>
      </TouchableOpacity>

      <FlatList

          data={data}
          nestedScrollEnabled={true}
          keyExtractor= {(item, index) => item.uid}
          renderItem={({item,index}) =>
              <TouchableOpacity
              underlayColor='transparent'
              onPress={() =>navigation.dispatch(StackActions.push('Detail', {details: item}))}>
                <View>
                <Text style={styles.title}>{item.name}</Text>
                <Image
                  style={{width:width,height:width}}
                  source={{uri: item.image}} />
                </View>
              </TouchableOpacity>
          }

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
