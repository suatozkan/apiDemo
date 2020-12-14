import React, {Component} from 'react';
import { StyleSheet,TouchableOpacity,Image,Dimensions,FlatList } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>

      <TouchableOpacity
             style={styles.back}
             onPress={()=> navigation.dispatch(popAction)
             }>
           <Text style={styles.title}>Geri</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{details.name}</Text>
      <Image
        style={{width:width-30,height:width-30,borderRadius:10}}
        source={{uri: details.image}} />
      <Text style={styles.title}>{details.species}</Text>
      <Text style={styles.title}>{details.gender}</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back:{
    position:'absolute',
    top:35,
    left:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
