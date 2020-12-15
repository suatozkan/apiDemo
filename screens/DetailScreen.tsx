import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity,Image,Dimensions,FlatList,SafeAreaView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { StackActions } from '@react-navigation/native';
import { useEffect, useState } from 'react'
import Get from '../components/Get'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TabTwoScreen(props) {

  const popAction = StackActions.pop(1);
  const { route,navigation } = props
  const { details } = route.params

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        <TouchableOpacity
               style={styles.back}
               onPress={()=> navigation.dispatch(popAction)
               }>
             <Text style={styles.text}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{details.name}</Text>
        <Image
          style={{width:width-30,height:width-30,borderRadius:10,marginTop:20}}
          source={{uri: details.image}} />
        <Text style={styles.text}>{details.species}</Text>
        <Text style={styles.text}>{details.gender}</Text>

        <FlatList

            data={details.episode}
            nestedScrollEnabled={true}
            keyExtractor= {(item, index) => item}
            renderItem={({item,index}) =>

                  <View>
                  <Get item={item} />

                  </View>

            }

        />


      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    backgroundColor:'whitesmoke'
  },
  back:{
    position:'absolute',
    top:10,
    left:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text:{
    fontSize: 20,
    fontWeight: '500',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
